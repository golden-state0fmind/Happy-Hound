import toast from "react-hot-toast";
import LoadingDots from "./loading-dots";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { RootState } from "../reducers";
import { useSelector } from "react-redux";
import { DogState } from "../reducers/dogReducer";

type EditPetProps = {
    name: string,
    userId: number | null,
    photo: string,
    weight: string,
    birthMonth: string,
    birthYear: string,
    sex: string,
    breed: string,
    microchipped: null | boolean,
    spayed: null | boolean,
    houseTrained: null | boolean,
    childFriendly: null | boolean,
    dogFriendly: null | boolean,
    catFriendly: null | boolean,
    adoptionDate: null | string,
    aboutPet: string,
    pottyBreakSchedule: string,
    energyLevel: number | null,
    feedingSchedule: string,
    aloneTime: string,
    medication: string,
    additionalInfo: string,
    healthInfo: string,
    vetName: string,
    vetPhone: null | number,
    vetAddress: string
}

const EditPetForm = () => {
    const user = useSelector((state: RootState) => state.user);
    const [emptyFields, setEmptyFields] = useState<string[]>([]);
    const [aloneTime, setAloneTime] = useState<number | null>(null);
    const [energyLevel, setEnergyLevel] = useState<number | null>(null);
    const [isMale, setIsMale] = useState<boolean | null>(null);
    const [isSpayed, setIsSpayed] = useState<boolean | null>(null);
    const [isHouseTrained, setIsHouseTrained] = useState<boolean | null>(null);
    const [isChildFriendly, setIsChildFriendly] = useState<boolean | null>(null);
    const [isDogFriendly, setIsDogFriendly] = useState<boolean | null>(null);
    const [isCatFriendly, setIsCatFriendly] = useState<boolean | null>(null);
    const [isMicrochipped, setIsMicrochipped] = useState<boolean | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [customAloneTime, setCustomAloneTime] = useState('');
    const [feedingSchedule, setFeedingSchedule] = useState<number | null>(null);
    const [pottyBreakCustom, setPottyBreakCustom] = useState('');
    const [pottyBreakSchedule, setPottyBreakSchedule] = useState<number | null>(null);
    const [customFeedingSchedule, setCustomFeedingSchedule] = useState('');
    const [isMedPill, setIsMedPill] = useState<boolean>(false);
    const [isMedTopical, setIsMedTopical] = useState<boolean>(false);
    const [isMedInjection, setIsMedInjection] = useState<boolean>(false);

    const router = useRouter();
    const today = new Date();
    const day = today.getDate().toString().padStart(2, '0'); // Get the day (1-31) and pad with zero if needed
    const month = (today.getMonth() + 1).toString().padStart(2, '0'); // Get the month (0-11); +1 to make it 1-12 and pad with zero if needed
    const year = today.getFullYear(); // Get the year (e.g., 2023)
    // Provided date in MM/DD/YYYY format
    const providedDate = `${month}/${day}/${year}`;
    // Convert to YYYY-MM-DD format
    const parts = providedDate.split('/');
    const formattedDate = `${parts[2]}-${parts[0].padStart(2, '0')}-${parts[1].padStart(2, '0')}`;

    const [petInfo, setPetInfo] = useState<EditPetProps>({
        name: '',                       // TEXT NOT NULL
        userId: user.id,                // INTEGER NOT NULL
        photo: '',                      // TEXT
        weight: '',                     // TEXT NOT NULL
        birthMonth: '',                 // TEXT NOT NULL
        birthYear: '',                  // TEXT NOT NULL
        sex: '',                        // "DogSex" NOT NULL
        breed: '',                      // TEXT NOT NULL
        microchipped: null,             // BOOLEAN NOT NULL
        spayed: null,                   // BOOLEAN NOT NULL
        houseTrained: null,             // BOOLEAN NOT NULL
        childFriendly: null,            // BOOLEAN NOT NULL
        dogFriendly: null,              // BOOLEAN NOT NULL
        catFriendly: null,              // BOOLEAN NOT NULL
        adoptionDate: formattedDate,    // TEXT NOT NULL
        aboutPet: '',                   // TEXT NOT NULL
        pottyBreakSchedule: '',         // TEXT NOT NULL
        energyLevel: null,              // INTEGER NOT NULL
        feedingSchedule: '',            // TEXT NOT NULL
        aloneTime: '',                  // TEXT NOT NULL
        medication: '',                 // TEXT NOT NULL
        additionalInfo: '',             // TEXT
        healthInfo: '',                 // TEXT
        vetName: '',                    // TEXT
        vetPhone: null,                   // INTEGER
        vetAddress: ''                  // TEXT
    });

    const pathName = usePathname();
    const lastSlashIndex = pathName.lastIndexOf("/");
    const petId = pathName.slice(lastSlashIndex + 1);
    const dogList = useSelector((state: RootState) => state.dogList.dogList);

    const findDogId = (petId: number) => {
        const fetchDog = dogList.filter(dog => {
            if (dog.id === petId) return dog;
        });

        if (fetchDog) {
            const editPet: any = fetchDog[0];
            console.log(editPet)
            setPetInfo(editPet);
            handlePetSexChange(editPet.sex);
            handleIsMicrochipped(editPet.microchipped);
            handleIsSpayed(editPet.spayed);
            handleIsHouseTrained(editPet.houseTrained);
            handleIsChildFriendly(editPet.childFriendly);
            handleIsDogFriendly(editPet.dogFriendly);
            handleIsCatFriendly(editPet.catFriendly);
            handlePottyBreakScheduleChange(editPet.pottyBreakSchedule);
            handleEnergyLevelChange(editPet.energyLevel);
            handleFeedingScheduleChange(editPet.feedingSchedule);
            handleAloneTimeChange(editPet.aloneTime)

        }
    }


    useEffect(() => {
        findDogId(Number(petId));
    }, [])

    const handlePetSexChange = (value: string) => {
        if (value === 'male') {
            setIsMale(true);
            petInfo.sex = value
        } else if (value === 'female') {
            setIsMale(false);
            petInfo.sex = value
        }
    };

    const handleIsMicrochipped = (value: string | boolean) => {
        if (value === 'Yes' || value === true) {
            setIsMicrochipped(true);
            petInfo.microchipped = true;
        } else if (value === 'No' || value === false) {
            setIsMicrochipped(false);
            petInfo.microchipped = false;
        }
    };

    const handleIsSpayed = (value: string | boolean) => {
        if (value === 'Yes' || value === true) {
            setIsSpayed(true);
            petInfo.spayed = true;
        } else if (value === 'No' || value === false) {
            setIsSpayed(false);
            petInfo.spayed = false;
        }
    };

    const handleIsHouseTrained = (value: string | boolean) => {
        if (value === 'Yes' || value === true) {
            setIsHouseTrained(true);
            petInfo.houseTrained = true;
        } else if (value === 'No' || value === false) {
            setIsHouseTrained(false);
            petInfo.houseTrained = false;
        }
    };
    const handleIsChildFriendly = (value: string | boolean) => {
        if (value === 'Yes' || value === true) {
            setIsChildFriendly(true);
            petInfo.childFriendly = true;
        } else if (value === 'No' || value === false) {
            setIsChildFriendly(false);
            petInfo.childFriendly = false;
        }
    };
    const handleIsDogFriendly = (value: string | boolean) => {
        if (value === 'Yes' || value === true) {
            setIsDogFriendly(true);
            petInfo.dogFriendly = true;
        } else if (value === 'No' || value === false) {
            setIsDogFriendly(false);
            petInfo.dogFriendly = false;
        }
    };
    const handleIsCatFriendly = (value: string | boolean) => {
        if (value === 'Yes' || value === true) {
            setIsCatFriendly(true);
            petInfo.catFriendly = true;
        } else if (value === 'No' || value === false) {
            setIsCatFriendly(false);
            petInfo.catFriendly = false;
        }
    };

    const handlePetInfoChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = event.target;
        if (id === 'vetPhone') {
            // Remove any non-numeric characters
            const removeNonNumerics = value.replace(/[^\d-]/g, '');
            // Convert the string to a number if it's not empty
            const vetPhoneValue = removeNonNumerics === '' ? null : +removeNonNumerics;
            // Set the state with the corrected vetPhone value
            setPetInfo({ ...petInfo, [id]: vetPhoneValue });
        } else {
            // For other fields, set the state directly
            setPetInfo({ ...petInfo, [id]: value });
        }
    };

    const handlePottyBreakScheduleChange = (value: number) => {
        setPottyBreakSchedule(value);
        if (value === 0) {
            // Show the textarea
            setPottyBreakCustom('');
        }
        petInfo.pottyBreakSchedule = `Every ${value} Hours`;
    };

    const handlePottyBreakCustomChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setPottyBreakCustom(event.target.value);
        petInfo.pottyBreakSchedule = pottyBreakCustom
    };

    const handleEnergyLevelChange = (value: number) => {
        setEnergyLevel(value);
        petInfo.energyLevel = value;
    };

    const handleAloneTimeChange = (value: number) => {
        setAloneTime(value);
        if (value === 0) {
            // Show the textarea
            setCustomAloneTime('');
        }
        if (value === 1) {
            petInfo.aloneTime = '< 1 Hour';
        }
        if (value === 4) {
            petInfo.aloneTime = '1-4 Hours';
        }
        if (value === 8) {
            petInfo.aloneTime = '4-8 Hours';
        }
    };

    const handleCustomAloneTimeChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setCustomAloneTime(event.target.value);
        petInfo.aloneTime = customAloneTime;
    };

    const handleFeedingScheduleChange = (value: number) => {
        setFeedingSchedule(value);
        if (value === 0) {
            // Show the textarea
            setCustomFeedingSchedule('');
        }
        if (value === 1) {
            petInfo.feedingSchedule = 'Morning';
        }
        if (value === 2) {
            petInfo.feedingSchedule = 'Twice a day';
        }
    };

    const handleCustomFeedingScheduleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setCustomFeedingSchedule(event.target.value);
        petInfo.feedingSchedule = customFeedingSchedule
    };

    const checkForMedication = () => {
        const medicalTreatment = [];
        if (isMedPill) {
            medicalTreatment.push('Medication Pill');
        }
        if (isMedTopical) {
            medicalTreatment.push('Medication Topical');
        }
        if (isMedInjection) {
            medicalTreatment.push('Medication Injection');
        }
        const medicationsAsString = medicalTreatment.join(', ');
        petInfo.medication = medicationsAsString;
    }

    const handleAdditionalInfo = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        petInfo.additionalInfo = event.target.value;
    }

    const handleHealthInfo = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        petInfo.healthInfo = event.target.value;
    }

    useEffect(() => {
        checkForMedication();
    }, [isMedPill, isMedTopical, isMedInjection]);

    function findNullFields(data: any) {
        const notNullFieldsArray = [
            'name',
            'userId',
            'weight',
            'birthMonth',
            'birthYear',
            'sex',
            'breed',
            'microchipped',
            'spayed',
            'houseTrained',
            'childFriendly',
            'dogFriendly',
            'catFriendly',
            'adoptionDate',
            'pottyBreakSchedule',
            'energyLevel',
            'feedingSchedule',
            'aloneTime',
        ];
        // New array for updated state
        const newEmptyFields: string[] = [];
        // Searching for empty or null values for fields before posting to DB
        for (const key of notNullFieldsArray) {
            if (data[key] === '' || data[key] === null) {
                newEmptyFields.push(key);
            }
        }
        // Updating state
        if (newEmptyFields.length > 0) {
            setEmptyFields(newEmptyFields);
            // There are fields with empty values that are supposed to be not null
            console.log(`Please fill out the following fields: ${newEmptyFields.join(', ')}`);
            setLoading(false);
        } else {
            // All required fields are filled
            // Proceed with form submission or other actions
            setLoading(true);
            fetch("/api/addpet", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: petInfo.name,
                    userId: petInfo.userId,
                    photo: petInfo.photo,
                    weight: petInfo.weight,
                    birthMonth: petInfo.birthMonth,
                    birthYear: petInfo.birthYear,
                    sex: petInfo.sex,
                    breed: petInfo.breed,
                    microchipped: petInfo.microchipped,
                    spayed: petInfo.spayed,
                    houseTrained: petInfo.houseTrained,
                    childFriendly: petInfo.childFriendly,
                    dogFriendly: petInfo.dogFriendly,
                    catFriendly: petInfo.catFriendly,
                    adoptionDate: petInfo.adoptionDate,
                    aboutPet: petInfo.aboutPet,
                    pottyBreakSchedule: petInfo.pottyBreakSchedule,
                    energyLevel: petInfo.energyLevel,
                    feedingSchedule: petInfo.feedingSchedule,
                    aloneTime: petInfo.aloneTime,
                    medication: petInfo.medication,
                    additionalInfo: petInfo.additionalInfo,
                    healthInfo: petInfo.healthInfo,
                    vetName: petInfo.vetName,
                    vetPhone: petInfo.vetPhone,
                    vetAddress: petInfo.vetAddress
                }),
            }).then(async (res) => {
                setLoading(false);
                if (res.status === 200) {
                    toast.success(`${petInfo.name} is Added! Redirecting to profile...`);
                    setTimeout(() => {
                        router.push("/profile");
                    }, 1000);
                } else {
                    const { error } = await res.json();
                    toast.error(error);
                }
            });
        };
    };

    const handleSavePetButton = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        findNullFields(petInfo);
    };

    return (
        <div className="w-full md:w-4/5 lg:w-2/4 md:mx-auto bg-gray-50 px-4 py-8 sm:px-16 space-y-4 mt-3 md:mt-8 mb-8 rounded-2xl border border-gray-100 shadow-xl">
            <h1 className="text-2xl text-blue-800 font-bold mb-4">Tell us about your pet</h1>

            <form onSubmit={handleSavePetButton}>
                {/* STARTS PET PHOTO */}
                <label htmlFor="petPhoto" className="block text-xs text-gray-600 uppercase">Update Pet Photo</label>
                <input id="petPhoto" type="file" className="w-full mt-1 block rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm sm:text-sm" />
                {/* ENDS PET PHOTO */}
                {/* PET DETAILS */}
                <h2 className="text-xl text-blue-800 font-bold">Pet details</h2>
                <div className="space-y-4">
                    <div className="block text-xs text-gray-600 uppercase">Provide a description of your pet</div>

                    {/* STARTS PET NAME */}
                    <div>
                        <div className='flex'>
                            <label htmlFor="name" className="block text-xs text-gray-600 uppercase">Name</label>
                            {petInfo.name === '' && (
                                <div className='ps-2 text-xs text-red-600 uppercase'>
                                    Required
                                </div>
                            )}
                        </div>
                        <input value={petInfo.name} onChange={handlePetInfoChange} id="name" type="text" className="w-full mt-1 block rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm sm:text-sm" />
                    </div>
                    {/* ENDS PET NAME */}
                    {/* STARTS WEIGHT */}
                    <div>
                        <div className='flex'>
                            <label htmlFor="weight" className="block text-xs text-gray-600 uppercase">Weight (lbs)</label>
                            {petInfo.weight === '' && (
                                <div className='ps-2 text-xs text-red-600 uppercase'>
                                    Required
                                </div>
                            )}
                        </div>
                        <input value={petInfo.weight} onChange={handlePetInfoChange} id="weight" type="text" className="w-full mt-1 block rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm sm:text-sm" />
                    </div>
                    {/* ENDS WEIGHT */}
                    {/* STARTS BIRTHDATE IN YEARS AND MONTHS */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <div className='flex'>
                                <label htmlFor="birthYear" className="block text-xs text-gray-600 uppercase">Age Years</label>
                                {petInfo.birthYear === '' && (
                                    <div className='ps-2 text-xs text-red-600 uppercase'>
                                        Required
                                    </div>
                                )}
                            </div>
                            <input value={petInfo.birthYear} onChange={handlePetInfoChange} id="birthYear" type="text" className="w-full mt-1 block rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm sm:text-sm" />
                        </div>
                        <div>
                            <div className='flex'>
                                <label htmlFor="birthMonth" className="block text-xs text-gray-600 uppercase">Age Months</label>
                                {petInfo.birthMonth === '' && (
                                    <div className='ps-2 text-xs text-red-600 uppercase'>
                                        Required
                                    </div>
                                )}
                            </div>
                            <input value={petInfo.birthMonth} onChange={handlePetInfoChange} id="birthMonth" type="text" className="w-full mt-1 block rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm sm:text-sm" />
                        </div>
                    </div>
                    {/* ENDS BIRTHDATE IN YEARS AND MONTHS */}
                    {/* STARTS SEX */}
                    <div>
                        <div className='flex' >
                            <label htmlFor="sex" className="block text-xs text-gray-600 uppercase">Sex</label>
                            {petInfo.sex === '' && (
                                <div className='ps-2 text-xs text-red-600 uppercase'>
                                    Required
                                </div>
                            )}
                        </div>
                        <div className="flex space-x-4">
                            {/* Male Radio Button */}
                            <ConditionalRadioButton
                                inputType={'text'}
                                labelName={'male'}
                                labelText={'Male'}
                                condition={isMale}
                                compareCondition={true}
                                onClick={async () => handlePetSexChange('male')}
                            />
                            {/* Female Radio Button */}
                            <ConditionalRadioButton
                                inputType={'text'}
                                labelName={'female'}
                                labelText={'Female'}
                                condition={isMale}
                                compareCondition={false}
                                onClick={async () => handlePetSexChange('female')}
                            />
                        </div>

                    </div>
                    {/* ENDS SEX */}
                    {/* STARTS BREED INPUT FIELD */}
                    <div>
                        <div className='flex'>
                            <label htmlFor="breed" className="block text-xs text-gray-600 uppercase">Breed(s)</label>
                            {petInfo.breed === '' && (
                                <div className='ps-2 text-xs text-red-600 uppercase'>
                                    Required
                                </div>
                            )}
                        </div>
                        <input value={petInfo.breed} onChange={handlePetInfoChange} id="breed" type="text" className="w-full mt-1 block rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm sm:text-sm" />
                        <p className="text-xs text-gray-600">Enter all breeds that apply. If your dog is a mixed breed, add ‘Mixed’ as well.</p>
                    </div>
                    {/* ENDS BREED INPUT FIELD */}
                    <h2 className="text-xl text-blue-800 font-bold">Additional details</h2>
                    {/* STARTS MICROCHIPPED */}
                    <div>
                        <div className='flex'>
                            <label className="block text-xs text-gray-600 uppercase">Microchipped?</label>
                            {petInfo.microchipped === null && (
                                <div className='ps-2 text-xs text-red-600 uppercase'>
                                    Required
                                </div>
                            )}
                        </div>
                        <div className="flex space-x-4">
                            <ConditionalRadioButton
                                inputType={'radio'}
                                labelName={'microchipped-yes'}
                                labelText={'Yes'}
                                condition={isMicrochipped}
                                compareCondition={true}
                                onClick={async () => handleIsMicrochipped('Yes')}
                            />
                            <ConditionalRadioButton
                                inputType={'radio'}
                                labelName={'microchipped-no'}
                                labelText={'No'}
                                condition={isMicrochipped}
                                compareCondition={false}
                                onClick={async () => handleIsMicrochipped('No')}
                            />
                        </div>
                    </div>
                    {/* ENDS MICROCHIPPED */}
                    {/* STARTS SPAYED/NEUTERED */}
                    <div>
                        <div className='flex'>
                            <label className="block text-xs text-gray-600 uppercase">Spayed/Neutered?</label>
                            {petInfo.spayed === null && (
                                <div className='ps-2 text-xs text-red-600 uppercase'>
                                    Required
                                </div>
                            )}
                        </div>
                        <div className="flex space-x-4">
                            <ConditionalRadioButton
                                inputType={'radio'}
                                labelName={'spayed-yes'}
                                labelText={'Yes'}
                                condition={isSpayed}
                                compareCondition={true}
                                onClick={async () => handleIsSpayed('Yes')}
                            />
                            <ConditionalRadioButton
                                inputType={'radio'}
                                labelName={'spayed-no'}
                                labelText={'No'}
                                condition={isSpayed}
                                compareCondition={false}
                                onClick={async () => handleIsSpayed('No')}
                            />
                        </div>
                    </div>
                    {/* ENDS SPAYED/NEUTERED */}
                    {/* STARTS HOUSE TRAINED */}
                    <div>
                        <div className='flex'>
                            <label className="block text-xs text-gray-600 uppercase">House trained?</label>
                            {petInfo.houseTrained === null && (
                                <div className='ps-2 text-xs text-red-600 uppercase'>
                                    Required
                                </div>
                            )}
                        </div>
                        <div className="flex space-x-4">
                            <ConditionalRadioButton
                                inputType={'radio'}
                                labelName={'house-trained-yes'}
                                labelText={'Yes'}
                                condition={isHouseTrained}
                                compareCondition={true}
                                onClick={async () => handleIsHouseTrained('Yes')}
                            />
                            <ConditionalRadioButton
                                inputType={'radio'}
                                labelName={'house-trained-no'}
                                labelText={'No'}
                                condition={isHouseTrained}
                                compareCondition={false}
                                onClick={async () => handleIsHouseTrained('No')}
                            />
                        </div>
                    </div>
                    {/* ENDS HOUSE TRAINED */}
                    {/* STARTS CHILD FRIENDLY */}
                    <div>
                        <div className='flex'>
                            <label className="block text-xs text-gray-600 uppercase">Friendly with children?</label>
                            {petInfo.childFriendly === null && (
                                <div className='ps-2 text-xs text-red-600 uppercase'>
                                    Required
                                </div>
                            )}
                        </div>
                        <div className="flex space-x-4">
                            <ConditionalRadioButton
                                inputType={'radio'}
                                labelName={'friendly-children-yes'}
                                labelText={'Yes'}
                                condition={isChildFriendly}
                                compareCondition={true}
                                onClick={async () => handleIsChildFriendly('Yes')}
                            />
                            <ConditionalRadioButton
                                inputType={'radio'}
                                labelName={'friendly-children-no'}
                                labelText={'No'}
                                condition={isChildFriendly}
                                compareCondition={false}
                                onClick={async () => handleIsChildFriendly('No')}
                            />
                        </div>
                    </div>
                    {/* ENDS CHILD FRIENDLY */}
                    {/* STARTS DOG FRIENDLY */}
                    <div>
                        <div className='flex'>
                            <label className="block text-xs text-gray-600 uppercase">Friendly with dogs?</label>
                            {petInfo.dogFriendly === null && (
                                <div className='ps-2 text-xs text-red-600 uppercase'>
                                    Required
                                </div>
                            )}
                        </div>
                        <div className="flex space-x-4">
                            <ConditionalRadioButton
                                inputType={'radio'}
                                labelName={'friendly-dogs-yes'}
                                labelText={'Yes'}
                                condition={isDogFriendly}
                                compareCondition={true}
                                onClick={async () => handleIsDogFriendly('Yes')}
                            />
                            <ConditionalRadioButton
                                inputType={'radio'}
                                labelName={'friendly-dogs-no'}
                                labelText={'No'}
                                condition={isDogFriendly}
                                compareCondition={false}
                                onClick={async () => handleIsDogFriendly('No')}
                            />
                        </div>
                    </div>
                    {/* ENDS DOG FRIENDLY */}
                    {/* CAT FRIENDLY */}
                    <div>
                        <div className='flex'>
                            <label className="block text-xs text-gray-600 uppercase">Friendly with cats?</label>
                            {petInfo.catFriendly === null && (
                                <div className='ps-2 text-xs text-red-600 uppercase'>
                                    Required
                                </div>
                            )}
                        </div>
                        <div className="flex space-x-4">
                            <ConditionalRadioButton
                                inputType={'radio'}
                                labelName={'friendly-cat-yes'}
                                labelText={'Yes'}
                                condition={isCatFriendly}
                                compareCondition={true}
                                onClick={async () => handleIsCatFriendly('Yes')}
                            />
                            <ConditionalRadioButton
                                inputType={'radio'}
                                labelName={'friendly-cat-no'}
                                labelText={'No'}
                                condition={isCatFriendly}
                                compareCondition={false}
                                onClick={async () => handleIsCatFriendly('No')}
                            />
                        </div>
                    </div>
                    {/* ENDS CAT FRIENDLY */}
                    {/* STARTS ADOPTION DATE */}
                    <div>
                        <label className="block text-xs text-gray-600 uppercase">Adoption date</label>
                        <input defaultValue={formattedDate} onChange={handlePetInfoChange} id="adoptionDate" type="date" className="w-full mt-1 block rounded-md border border-gray-300 px-3 py-2 text-green-800 shadow-sm sm:text-sm" />
                    </div>
                    {/* ENDS ADOPTION DATE */}
                    {/* STARTS ABOUT PET TEXT AREA */}
                    <div>
                        <label className="block text-xs text-gray-600 uppercase">About your pet</label>
                        <textarea value={petInfo.aboutPet} onChange={handlePetInfoChange} id="aboutPet" className="w-full mt-1 block rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm sm:text-sm"></textarea>
                    </div>
                    {/* ENDS ABOUT PET TEXT AREA */}
                    <h2 className="text-xl text-blue-800 font-bold">Care Info</h2>
                    {/* POTTY BREAK SCHEDULE */}
                    <div>
                        <div className='flex'>
                            <div className="block text-xs text-gray-600 uppercase">Potty break schedule</div>
                            {petInfo.pottyBreakSchedule === '' && (
                                <div className='ps-2 text-xs text-red-600 uppercase'>
                                    Required
                                </div>
                            )}
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            {/* STARTS EVERY HOUR POTTY BREAK */}
                            <div className="col-span-1 md:col-span-2 lg:col-span-1">
                                <ConditionalRadioButton
                                    inputType={'radio'}
                                    labelName={'everyHour'}
                                    labelText={'every hour'}
                                    condition={pottyBreakSchedule}
                                    compareCondition={1}
                                    onClick={async () => handlePottyBreakScheduleChange(1)}
                                />
                            </div>
                            {/* ENDS EVERY HOUR POTTY BREAK */}
                            {/* STARTS EVERY 2 HOUR POTTY BREAK */}
                            <div className="col-span-1 md:col-span-2 lg:col-span-1">
                                <ConditionalRadioButton
                                    inputType={'radio'}
                                    labelName={'2hours'}
                                    labelText={'Every 2 hours'}
                                    condition={pottyBreakSchedule}
                                    compareCondition={2}
                                    onClick={async () => handlePottyBreakScheduleChange(2)}
                                />
                            </div>
                            {/* ENDS EVERY 2 HOUR POTTY BREAK */}
                            {/* STARTS 4 HOURS POTTY BREAK */}
                            <div className="col-span-1 md:col-span-2 lg:col-span-1">
                                <ConditionalRadioButton
                                    inputType={'radio'}
                                    labelName={'4hours'}
                                    labelText={'Every 4 hours'}
                                    condition={pottyBreakSchedule}
                                    compareCondition={4}
                                    onClick={async () => handlePottyBreakScheduleChange(4)}
                                />
                            </div>
                            {/* ENDS EVERY 4 HOURS POTTY BREAK */}
                            {/* STARTS EVERY 8 HOUR POTTY BREAK */}
                            <div className="col-span-1 md:col-span-2 lg:col-span-1">
                                <ConditionalRadioButton
                                    inputType={'radio'}
                                    labelName={'8hours'}
                                    labelText={'Every 8 hours'}
                                    condition={pottyBreakSchedule}
                                    compareCondition={8}
                                    onClick={async () => handlePottyBreakScheduleChange(8)}
                                />
                            </div>
                            {/* ENDS EVERY 8 HOUR POTTY BREAK*/}
                            {/* STARTS CUSTOM POTTY BREAK SCHEDULE */}
                            <div className="col-span-2 md:col-span-1">
                                <ConditionalRadioButton
                                    inputType={'radio'}
                                    labelName={'custom'}
                                    labelText={'Custom'}
                                    condition={pottyBreakSchedule}
                                    compareCondition={0}
                                    onClick={async () => handlePottyBreakScheduleChange(0)}
                                />
                            </div>
                            {/* ENDS CUSTOM POTTY BREAK SCHEDULE */}
                        </div>
                        {pottyBreakSchedule === 0 && (
                            <textarea
                                value={pottyBreakCustom}
                                onChange={handlePottyBreakCustomChange}
                                placeholder="Enter custom potty break schedule"
                                className='w-full mt-1 block rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm sm:text-sm'
                            />
                        )}
                    </div>
                    {/* ENERGY LEVEL */}
                    <div>
                        <div className='flex'>
                            <div className="block text-xs text-gray-600 uppercase">Energy Level</div>
                            {petInfo.energyLevel === null && (
                                <div className='ps-2 text-xs text-red-600 uppercase'>
                                    Required
                                </div>
                            )}
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            {/* STARTS HIGH ENERGY */}
                            <ConditionalRadioButton
                                inputType={'radio'}
                                labelName={'high'}
                                labelText={'High'}
                                condition={energyLevel}
                                compareCondition={3}
                                onClick={async () => handleEnergyLevelChange(3)}
                            />
                            {/* ENDS HIGH ENERGY */}
                            {/* STARTS MODERATE ENERGY */}
                            <ConditionalRadioButton
                                inputType={'radio'}
                                labelName={'moderate'}
                                labelText={'Moderate'}
                                condition={energyLevel}
                                compareCondition={2}
                                onClick={async () => handleEnergyLevelChange(2)}
                            />
                            {/* ENDS MODERATE ENERGY */}
                            {/* STARTS LOW ENERGY */}
                            <ConditionalRadioButton
                                inputType={'radio'}
                                labelName={'low'}
                                labelText={'Low'}
                                condition={energyLevel}
                                compareCondition={1}
                                onClick={async () => handleEnergyLevelChange(1)}
                            />
                            {/* ENDS LOW ENERGY */}
                        </div>
                    </div>
                    {/* FEEDING SCHEDULE */}
                    <div>
                        <div className='flex'>
                            <div className="block text-xs text-gray-600 uppercase">Feeding schedule</div>
                            {petInfo.feedingSchedule === '' && (
                                <div className='ps-2 text-xs text-red-600 uppercase'>
                                    Required
                                </div>
                            )}
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            {/* STARTS MORNING FEED TIME */}
                            <ConditionalRadioButton
                                inputType={'radio'}
                                labelName={'morning'}
                                labelText={'Morning'}
                                condition={feedingSchedule}
                                compareCondition={1}
                                onClick={async () => handleFeedingScheduleChange(1)}
                            />
                            {/* ENDS MORNING FEED TIME */}
                            {/* STARTS TWICE A DAY FEED TIME */}
                            <ConditionalRadioButton
                                inputType={'radio'}
                                labelName={'twiceADay'}
                                labelText={'Twice a day'}
                                condition={feedingSchedule}
                                compareCondition={2}
                                onClick={async () => handleFeedingScheduleChange(2)}
                            />
                            {/* ENDS TWICE A DAY FEED TIME */}
                            {/* STARTS CUSTOM FEEDING TIME */}
                            <ConditionalRadioButton
                                inputType={'radio'}
                                labelName={'customFeeding'}
                                labelText={'Custom'}
                                condition={feedingSchedule}
                                compareCondition={0}
                                onClick={async () => handleFeedingScheduleChange(0)}
                            />
                            {/* ENDS CUSTOM FEEDING TIME */}
                        </div>
                        <div>
                            {feedingSchedule === 0 && (
                                <textarea
                                    value={customFeedingSchedule}
                                    onChange={handleCustomFeedingScheduleChange}
                                    placeholder="Enter custom feeding schedule"
                                    className='w-full mt-1 block rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm sm:text-sm'
                                />
                            )}
                        </div>
                    </div>
                    {/* ALONE TIME */}
                    <div>
                        <div className='flex'>
                            <div className="block text-xs text-gray-600 uppercase">Can be left alone</div>
                            {petInfo.aloneTime === '' && (
                                <div className='ps-2 text-xs text-red-600 uppercase'>
                                    Required
                                </div>
                            )}
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            {/* STARTS LESS THAN 1 HOUR ALONE TIME */}
                            <div className="col-span-1 md:col-span-2 lg:col-span-1">
                                <ConditionalRadioButton
                                    inputType={'radio'}
                                    labelName={'lessThan1'}
                                    labelText={`< 1 Hour`}
                                    condition={aloneTime}
                                    compareCondition={1}
                                    onClick={async () => handleAloneTimeChange(1)}
                                />
                            </div>
                            {/* ENDS LESS THAN 1 HOUR ALONE TIME */}
                            {/* STARTS 1-4 HOUR ALONE TIME */}
                            <div className="col-span-1 md:col-span-2 lg:col-span-1">
                                <ConditionalRadioButton
                                    inputType={'radio'}
                                    labelName={'1-4hours'}
                                    labelText={'1-4 Hours'}
                                    condition={aloneTime}
                                    compareCondition={4}
                                    onClick={async () => handleAloneTimeChange(4)}
                                />
                            </div>
                            {/* ENDS 1-4 HOUR ALONE TIME */}
                            {/* STARTS 4-8 HOUR ALONE TIME */}
                            <div className="col-span-1 md:col-span-2 lg:col-span-1">
                                <ConditionalRadioButton
                                    inputType={'radio'}
                                    labelName={'4-8hours'}
                                    labelText={'4-8 Hours'}
                                    condition={aloneTime}
                                    compareCondition={8}
                                    onClick={async () => handleAloneTimeChange(8)}
                                />
                            </div>
                            {/* ENDS 4-8 HOUR ALONE TIME */}
                            {/* STARTS CUSTOM ALONE TIME RADIO BUTTON */}
                            <div className="col-span-1 md:col-span-2 lg:col-span-1">
                                <ConditionalRadioButton
                                    inputType={'radio'}
                                    labelName={'customAlone'}
                                    labelText={'Custom'}
                                    condition={aloneTime}
                                    compareCondition={0}
                                    onClick={async () => handleAloneTimeChange(0)}
                                />
                            </div>
                            {/* ENDS CUSTOM ALONE TIME RADIO BUTTON */}
                        </div>
                        {aloneTime === 0 && (
                            <textarea
                                value={customAloneTime}
                                onChange={handleCustomAloneTimeChange}
                                placeholder="Enter custom alone time"
                                className='w-full mt-1 block rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm sm:text-sm'
                            />
                        )}
                    </div>
                    {/* MEDICATION */}
                    <div>
                        <div className="block text-xs text-gray-600 uppercase">Medication (select all that apply)</div>
                        <div className="grid grid-cols-2 gap-2">
                            {/* STARTS MED PILL RADIO BUTTON */}
                            <div className='col-span-1 md:col-span-2 lg:col-span-1'>
                                <ConditionalRadioButton
                                    inputType={'radio'}
                                    labelName={'medicationPill'}
                                    labelText={'Pill'}
                                    condition={isMedPill}
                                    compareCondition={true}
                                    onClick={async () => setIsMedPill(!isMedPill)}
                                />
                            </div>
                            {/* ENDS MED PILL RADIO BUTTON */}
                            {/* STARTS MED TOPICAL RADIO BUTTON */}
                            <div className='col-span-1 md:col-span-2 lg:col-span-1'>
                                <ConditionalRadioButton
                                    inputType={'radio'}
                                    labelName={'medicationTopical'}
                                    labelText={'Topical'}
                                    condition={isMedTopical}
                                    compareCondition={true}
                                    onClick={async () => setIsMedTopical(!isMedTopical)}
                                />
                            </div>
                            {/* ENDS MED TOPICAL RADIO BUTTON */}
                            {/* STARTS MED INJECTION RADIO BUTTON */}
                            <div className='col-span-1 md:col-span-2 lg:col-span-1'>
                                <ConditionalRadioButton
                                    inputType={'radio'}
                                    labelName={'medicationInjection'}
                                    labelText={'Injection'}
                                    condition={isMedInjection}
                                    compareCondition={true}
                                    onClick={async () => setIsMedInjection(!isMedInjection)}
                                />
                            </div>
                            {/* ENDS MED INJECTION RADIO BUTTON */}
                        </div>
                    </div>
                    {/* STARTS ADDITIONAL HEALTH INFO */}
                    <div>
                        <label htmlFor='additionalInfo' className="block text-xs text-gray-600 uppercase">Anything else a sitter should know?</label>
                        <textarea onChange={handleAdditionalInfo} id="additionalInfo" className="w-full mt-1 block rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm sm:text-sm"></textarea>
                    </div>
                    {/* ENDS ADDITIONAL HEALTH INFO */}
                    {/* STARTS HEALTH INFO TEXT AREA*/}
                    <div>
                        <label htmlFor='healthInfo' className="block text-xs text-gray-600 uppercase">Add details about your pet&apos;s health and care providers</label>
                        <textarea onChange={handleHealthInfo} id="healthInfo" className="w-full mt-1 block rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm sm:text-sm"></textarea>
                    </div>
                    {/* ENDS HEALTH INFO TEXT AREA */}
                    <h2 className="text-xl text-blue-800 font-bold">Health Info</h2>
                    {/* VET INFO */}
                    <div>
                        <div className='grid grid-cols-2 gap-4'>
                            {/* STARTS VET NAME */}
                            <div>
                                <label className="block text-xs text-gray-600 uppercase">Veterinary Name</label>
                                <input
                                    id="vetName"
                                    type="text"
                                    value={petInfo.vetName}
                                    onChange={handlePetInfoChange}
                                    className="w-full mt-1 block rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm sm:text-sm"
                                    placeholder=""
                                />
                            </div>
                            {/* ENDS VET NAME */}
                            {/* STARTS VET PHONE NUMBER */}
                            <div>
                                <label className="block text-xs text-gray-600 uppercase">Veterinary Phone</label>
                                <input
                                    id="vetPhone"
                                    type="tel"
                                    pattern="\d*"
                                    inputMode="numeric"
                                    maxLength={10}
                                    value={petInfo.vetPhone === null ? '' : petInfo.vetPhone}
                                    onChange={handlePetInfoChange}
                                    className="w-full mt-1 block rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm sm:text-sm"
                                    placeholder=""
                                />
                            </div>
                        </div>
                        {/* ENDS VET PHONE NUMBER */}
                        {/* STARTS VET ADDRESS */}
                        <div>
                            <label className="block text-xs text-gray-600 uppercase mt-5">Veterinary Address</label>
                            <input
                                id="vetAddress"
                                type="text"
                                value={petInfo.vetAddress}
                                onChange={handlePetInfoChange}
                                className="w-full my-2 block rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm sm:text-sm"
                                placeholder=""
                            />
                        </div>
                        {/* ENDS VET ADDRESS */}
                    </div>
                </div>
                <button
                    aria-label={'Save Pet'}
                    disabled={loading}
                    className={`${loading
                        ? "cursor-not-allowed border-blue-200 bg-blue-600"
                        : "border-blue-200 bg-blue-300 text-black hover:bg-blue-800 hover:text-white"
                        } flex h-10 w-full items-center justify-center rounded-md border text-sm transition-all focus:outline-none mt-5`}
                >
                    {loading ? (
                        <LoadingDots color="#FFFFFF" />
                    ) : (
                        <p>{'Save Pet'}</p>
                    )}
                </button>
            </form>
        </div>
    );
};

// Helper function for the radio buttons
type TRadioButton = {
    inputType: string,
    labelName: string,
    labelText: string,
    condition: boolean | number | null,
    compareCondition: boolean | number,
    onClick: () => {},
}

const ConditionalRadioButton = ({ inputType, labelName, labelText, condition, compareCondition, onClick }: TRadioButton) => {
    return (
        <div onClick={onClick} className={`relative flex row-reverse text-base`}>
            <div className={`w-6 h-6 mr-2 border-2 ${condition === compareCondition ? 'border-green-600' : 'border-blue-800'} rounded-full flex items-center justify-center`}>
                {condition === compareCondition && (
                    <div className='text-green-600'> &#x2713; </div>
                )}
            </div>
            <label htmlFor={`${labelName}`} className={`capitalize ${condition === compareCondition ? 'text-green-600' : 'text-blue-800'}`}>
                {labelText}
                <input id={`${labelName}`} name={`${labelName}`} type={`${inputType}`} hidden />
            </label>
        </div>
    );
};

export { EditPetForm }