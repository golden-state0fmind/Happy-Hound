import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { RootState } from "../reducers";
import { useSelector } from "react-redux";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import LoadingDots from "../components/loading-dots";
import { fetchProfile } from "../reducers/userReducer";

export type UserProfileTypes = {
    id: number | null,
    userId: number | null,
    address: string | null,
    city: string | null,
    state: string | null,
    postcode: string | null,
    country: string | null,
    photo: string | null,
    age: string | null | number,
    phone: string | null,
    eContactName: string | null,
    eContactPhone: string | null,
}

export const EditUserForm = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false); // Handles loading for sending data
    const [isLoading, setIsLoading] = useState(true); // Handles loading for receiving data
    const user = useSelector((state: RootState) => state.user);
    const [selectedRole, setSelectedRole] = useState("DOG_OWNER");
    const [calDefaultValue, setCalDefaultValue] = useState<string>("")
    const [userAge, setUserAge] = useState<number | null | string>(null);
    const [userInfo, setUserInfo] = useState<UserProfileTypes>({
        id: user.id,
        userId: user.id,
        address: "",
        city: "",
        state: "",
        postcode: "",
        country: "",
        photo: "",
        age: userAge,
        phone: "",
        eContactName: "",
        eContactPhone: "",
    });
    // HANDLES GETTING TODAYS DATE
    const today = new Date();
    const day = today.getDate().toString().padStart(2, '0'); // Get the day (1-31) and pad with zero if needed
    const month = (today.getMonth() + 1).toString().padStart(2, '0'); // Get the month (0-11); +1 to make it 1-12 and pad with zero if needed
    const year = today.getFullYear(); // Get the year (e.g., 2023)
    // Provided date in MM/DD/YYYY format
    const providedDate = `${month}/${day}/${year}`;
    // Convert to YYYY-MM-DD format
    const parts = providedDate.split('/');
    const formattedDate = `${parts[2]}-${parts[0].padStart(2, '0')}-${parts[1].padStart(2, '0')}`;

    const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        // Convert the formatted dates to Date objects
        const dateOfBirth: number | Date = new Date(formattedDate);
        const date21YearsAgo: number | Date = new Date(value);
        // Check if both dates are valid
        if (dateOfBirth instanceof Date && date21YearsAgo instanceof Date) {
            // Calculate the time difference in milliseconds
            const timeDifference = dateOfBirth.getTime() - date21YearsAgo.getTime();
            // Convert the time difference to years
            const ageDifferenceInYears = timeDifference / (1000 * 60 * 60 * 24 * 365);
            // Round down the age difference to the nearest whole number
            const roundedAgeDifference = Math.floor(ageDifferenceInYears);
            setUserAge(roundedAgeDifference.toString());
        } else {
            console.error('Invalid date(s)');
        }
    }

    // Event handler to update the selected role
    const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedRole(e.target.value);
    };

    // HANDLES MOST OF THE USER INFO
    const handleUserInfoChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = event.target;
        if (id === 'phone' || id === 'eContactPhone') {
            // Remove any non-numeric characters
            const removeNonNumerics = value.replace(/[^\d-]/g, '');
            // Convert the string to a number if it's not empty
            const newPhoneValue = removeNonNumerics === '' ? null : removeNonNumerics;
            // Set the state with the corrected vetPhone value
            setUserInfo({ ...userInfo, [id]: newPhoneValue });
        } else {
            // For other fields, set the state directly
            setUserInfo({ ...userInfo, [id]: value });
        }
    };

    useEffect(() => {
        fetchProfile(`/api/getuserprofile/${user.id}`)
            .then((res) => {
                // Stores user profile data in local state
                const resData = res.data;
                setUserInfo(resData);
                // Formats the date saved in db
                const providedDate4rmDb = `${month}/${day}/${year - Number(resData.age)}`;
                const parts4DbBd = providedDate4rmDb.split('/');
                const formattedDate4rmDb = `${parts4DbBd[2]}-${parts4DbBd[0].padStart(2, '0')}-${parts4DbBd[1].padStart(2, '0')}`;
                const dBdValue = userInfo.age !== "" || userInfo.age !== null ? formattedDate4rmDb : formattedDate;
                setCalDefaultValue(dBdValue)
                setIsLoading(false);
            })
            .catch((error) => {
                console.log(error);
            })
    }, []);

    const handleDeleteProfile = async () => {
        console.log('Delete Profile', user.id);
        try {
            await fetch(`/api/deleteprofile/${user.id}`);
            toast.success(`${user.firstName}, your profile is now being deleted...`);

            // Add a delay; Display the success message before redirecting
            await new Promise(() => setTimeout(() => {
                sessionStorage.clear();
                signOut();
                router.push("/");
            }, 2000));
        } catch (error) {
            toast.error(`Error deleting profile: ${error}`);
            await new Promise(() => setTimeout(() => {
                router.push("/profile");
            }, 2000));
        }
    }
    // TODO: Handle age and date to prevent null values & need to save the month and day

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                let userProfile = {
                    id: user.id,
                    userId: user.id,
                    address: e.currentTarget.address.value,
                    city: e.currentTarget.city.value,
                    state: e.currentTarget.state.value,
                    postcode: e.currentTarget.postcode.value,
                    country: "US",
                    photo: "",
                    age: userAge,
                    phone: e.currentTarget.phone.value,
                    eContactName: e.currentTarget.eContactName.value,
                    eContactPhone: userInfo.eContactPhone,
                }
                // console.log(userProfile, "====")
                setLoading(true);
                fetch(`/api/editprofile`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(userProfile),
                }).then(async (res) => {
                    setLoading(false);
                    if (res.status === 200) {
                        toast.success("Account updated! Redirecting to profile...");
                        setTimeout(() => {
                            router.push("/profile");
                        }, 2000);
                    } else {
                        const { error } = await res.json();
                        toast.error(error);
                    }
                });
            }}
            className="flex flex-col space-y-4 bg-gray-50 py-8">
            {/* STARTS USERNAME */}
            <div>
                <label
                    htmlFor="firstName"
                    className="block text-xs text-gray-600 uppercase"
                >
                    First Name
                </label>
                {
                    isLoading
                        ? (
                            <div className='animate-pulse bg-blue-300 mt-1 block w-full appearance-none rounded-md border border-blue-300 px-3 py-2 shadow-sm text-center'>
                                <LoadingDots color="blue" />
                            </div>
                        )
                        : (
                            <input
                                id="firstName"
                                name="firstName"
                                type="text"
                                placeholder="John"
                                autoComplete="firstName"
                                defaultValue={user.firstName ? user.firstName : ''}
                                required
                                className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm sm:text-sm"
                            />
                        )
                }
                <label
                    htmlFor="lastName"
                    className="block text-xs text-gray-600 uppercase mt-4"
                >
                    last Name
                </label>
                {
                    isLoading
                        ? (
                            <div className='animate-pulse bg-blue-300 mt-1 block w-full appearance-none rounded-md border border-blue-300 px-3 py-2 shadow-sm text-center'>
                                <LoadingDots color="blue" />
                            </div>
                        )
                        : (
                            <input
                                id="lastName"
                                name="lastName"
                                type="text"
                                placeholder="Wick"
                                autoComplete="lastName"
                                defaultValue={user.lastName ? user.lastName : ''}
                                required
                                className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm sm:text-sm"
                            />
                        )
                }
            </div>
            {/* END USERNAME */}
            {/* STARTS AGE */}
            <div>
                <label
                    htmlFor="age"
                    className="block text-xs text-gray-600 uppercase"
                >
                    AGE
                    <span className='sm:text-sm p-2'>
                        {
                            (userInfo && userInfo.age) ?? userAge ?? <LoadingDots color="blue" />
                        }
                    </span>
                </label>
                {
                    isLoading
                        ? (
                            <div className='animate-pulse bg-blue-300 mt-1 block w-full appearance-none rounded-md border border-blue-300 px-3 py-2 shadow-sm text-center'>
                                <LoadingDots color="blue" />
                            </div>
                        ) : (
                            <input
                                aria-label="birthDate"
                                id="birthDate"
                                name="birthDate"
                                type="date"
                                required
                                defaultValue={calDefaultValue}
                                onChange={handleAgeChange}
                                className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-green-800 shadow-sm sm:text-sm"
                            />
                        )
                }
            </div>
            {/* ENDS AGE */}
            <div className="grid grid-cols-2 gap-4">
                {/* STARTS ADDRESS */}
                <div>
                    <label
                        htmlFor="address"
                        className="block text-xs text-gray-600 uppercase"
                    >
                        Street Address
                    </label>
                    {
                        isLoading
                            ? (
                                <div className='animate-pulse bg-blue-300 mt-1 block w-full appearance-none rounded-md border border-blue-300 px-3 py-2 shadow-sm text-center'>
                                    <LoadingDots color="blue" />
                                </div>
                            ) : (
                                <input
                                    id="address"
                                    name="address"
                                    type="text"
                                    placeholder="25 Broadway"
                                    value={userInfo.address !== null ? userInfo.address : ""}
                                    autoComplete="address"
                                    onChange={handleUserInfoChange}
                                    required
                                    className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm sm:text-sm"
                                />
                            )
                    }
                </div>
                {/* ENDS ADDRESS */}
                {/* STARTS CITY */}
                <div>
                    <label
                        htmlFor="city"
                        className="block text-xs text-gray-600 uppercase"
                    >
                        City
                    </label>
                    {
                        isLoading
                            ? (
                                <div className='animate-pulse bg-blue-300 mt-1 block w-full appearance-none rounded-md border border-blue-300 px-3 py-2 shadow-sm text-center'>
                                    <LoadingDots color="blue" />
                                </div>
                            ) : (
                                <input
                                    id="city"
                                    name="city"
                                    type="text"
                                    placeholder="New York"
                                    autoComplete="city"
                                    value={userInfo.city !== null ? userInfo.city : ""}
                                    onChange={handleUserInfoChange}
                                    required
                                    className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm sm:text-sm"
                                />
                            )
                    }
                </div>
                {/* ENDS CITY */}
            </div>
            <div className="grid grid-cols-2 gap-4">
                {/* STARTS STATE */}
                <div>
                    <label
                        htmlFor="state"
                        className="block text-xs text-gray-600 uppercase"
                    >
                        State
                    </label>
                    {
                        isLoading
                            ? (
                                <div className='animate-pulse bg-blue-300 mt-1 block w-full appearance-none rounded-md border border-blue-300 px-3 py-2 shadow-sm text-center'>
                                    <LoadingDots color="blue" />
                                </div>
                            ) : (
                                <input
                                    id="state"
                                    name="state"
                                    type="text"
                                    placeholder="NY"
                                    autoComplete="state"
                                    value={userInfo.state !== null ? userInfo.state : ""}
                                    onChange={handleUserInfoChange}
                                    required
                                    className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm sm:text-sm"
                                />
                            )
                    }
                </div>
                {/* ENDS STATE */}
                {/* STARTS POSTCODE */}
                <div>
                    <label
                        htmlFor="postcode"
                        className="block text-xs text-gray-600 uppercase"
                    >
                        Postcode
                    </label>
                    {
                        isLoading
                            ? (
                                <div className='animate-pulse bg-blue-300 mt-1 block w-full appearance-none rounded-md border border-blue-300 px-3 py-2 shadow-sm text-center'>
                                    <LoadingDots color="blue" />
                                </div>
                            ) : (
                                <input
                                    id="postcode"
                                    name="postcode"
                                    type="text"
                                    placeholder="10004"
                                    autoComplete="postcode"
                                    value={userInfo.postcode !== null ? userInfo.postcode : ""}
                                    onChange={handleUserInfoChange}
                                    required
                                    className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm sm:text-sm"
                                />
                            )
                    }
                </div>
                {/* ENDS POSTCODE */}
            </div>
            {/* START EMAIL ADDRESS */}
            <div>
                <label
                    htmlFor="email"
                    className="block text-xs text-gray-600 uppercase"
                >
                    Email Address
                </label>
                {
                    isLoading
                        ? (
                            <div className='animate-pulse bg-blue-300 mt-1 block w-full appearance-none rounded-md border border-blue-300 px-3 py-2 shadow-sm text-center'>
                                <LoadingDots color="blue" />
                            </div>
                        ) : (
                            <input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="wroof@thedogpark.com"
                                autoComplete="email"
                                defaultValue={user.email ? user.email : ''}
                                required
                                className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm sm:text-sm"
                            />
                        )
                }
            </div>
            {/* END EMAIL ADDRESS */}
            {/* START PHONE */}
            <div>
                <label
                    htmlFor="phone"
                    className="block text-xs text-gray-600 uppercase"
                >
                    Phone
                </label>
                {
                    isLoading
                        ? (
                            <div className='animate-pulse bg-blue-300 mt-1 block w-full appearance-none rounded-md border border-blue-300 px-3 py-2 shadow-sm text-center'>
                                <LoadingDots color="blue" />
                            </div>
                        ) : (
                            <input
                                id="phone"
                                name="phone"
                                type="tel"
                                pattern="\d*"
                                inputMode="numeric"
                                maxLength={10}
                                value={userInfo.phone !== null ? userInfo.phone : ""}
                                onChange={handleUserInfoChange}
                                required
                                className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm sm:text-sm"
                            />
                        )
                }
            </div>
            {/* END PHONE */}
            {/* START ROLE */}
            <div>
                <label
                    htmlFor="role"
                    className="block text-xs text-gray-600 uppercase"
                >
                    Role
                </label>
                {
                    isLoading
                        ? (
                            <div className='animate-pulse bg-blue-300 mt-1 block w-full appearance-none rounded-md border border-blue-300 px-3 py-2 shadow-sm text-center'>
                                <LoadingDots color="blue" />
                            </div>
                        ) : (
                            <select
                                id="role"
                                name="role"
                                required
                                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm sm:text-sm"
                                defaultValue={user.role ? user.role : selectedRole}
                                onChange={handleRoleChange}
                            >
                                <option defaultValue="DOG_OWNER">DOG OWNER</option>
                                <option value="DOG_SITTER">DOG SITTER</option>
                            </select>
                        )
                }
            </div>
            {/* END ROLE */}
            {/* STARTS E-CONTACT-NAME */}
            <div>
                <label
                    htmlFor="eContactName"
                    className="block text-xs text-gray-600 uppercase"
                >
                    Emergency Contact Name
                </label>
                {
                    isLoading
                        ? (
                            <div className='animate-pulse bg-blue-300 mt-1 block w-full appearance-none rounded-md border border-blue-300 px-3 py-2 shadow-sm text-center'>
                                <LoadingDots color="blue" />
                            </div>
                        ) : (
                            <input
                                id="eContactName"
                                name="eContactName"
                                type="text"
                                placeholder="Winston"
                                autoComplete="eContactName"
                                value={userInfo.eContactName !== null ? userInfo.eContactName : ""}
                                onChange={handleUserInfoChange}
                                required
                                className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm sm:text-sm"
                            />
                        )
                }
            </div>
            {/* ENDS E-CONTACT-NAME */}
            {/* STARTS E-CONTACT-PHONE */}
            <div>
                <label
                    htmlFor="eContactPhone"
                    className="block text-xs text-gray-600 uppercase"
                >
                    Emergency Contact Phone
                </label>
                {
                    isLoading
                        ? (
                            <div className='animate-pulse bg-blue-300 mt-1 block w-full appearance-none rounded-md border border-blue-300 px-3 py-2 shadow-sm text-center'>
                                <LoadingDots color="blue" />
                            </div>
                        ) : (
                            <input
                                id="eContactPhone"
                                name="eContactPhone"
                                type="tel"
                                pattern="\d*"
                                inputMode="numeric"
                                maxLength={10}
                                placeholder="9093216543"
                                autoComplete="eContactPhone"
                                value={userInfo.eContactPhone !== null ? userInfo.eContactPhone : ""}
                                onChange={handleUserInfoChange}
                                required
                                className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm sm:text-sm"
                            />
                        )
                }
            </div>
            {/* ENDS E-CONTACT-PHONE */}
            <button
                aria-label={'Update Profile'}
                disabled={loading}
                className={`${loading
                    ? "cursor-not-allowed border-blue-200 bg-blue-600"
                    : "border-blue-200 bg-blue-300 text-black hover:bg-blue-800 hover:text-white"
                    } flex h-10 w-full items-center justify-center rounded-md border text-sm transition-all focus:outline-none`}
            >
                {loading ? (
                    <LoadingDots color="#FFFFFF" />
                ) : (
                    <p>Update Profile</p>
                )}
            </button>
            <button
                onClick={handleDeleteProfile}
                aria-label={'Delete Profile'}
                disabled={loading}
                className={`${loading
                    ? "cursor-not-allowed border-red-200 bg-red-600"
                    : "border-red-200 bg-red-300 text-black hover:bg-red-800 hover:text-white"
                    } flex h-10 w-full items-center justify-center rounded-md border text-sm transition-all focus:outline-none`}
            >
                <p>Delete Profile</p>
            </button>
        </form>
    );
};