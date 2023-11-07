"use client"
import React, { useState } from 'react';
import LoadingDots from './loading-dots';

const PetForm = () => {
    const [aloneTime, setAloneTime] = useState('');
    const [energyLevel, setEnergyLevel] = useState('');
    const [isMale, setIsMale] = useState<boolean>(false);
    const [isSpayed, setIsSpayed] = useState<boolean>(false);
    const [isHouseTrained, setIsHouseTrained] = useState<boolean>(false);
    const [isChildFriendly, setIsChildFriendly] = useState<boolean>(false);
    const [isDogFriendly, setIsDogFriendly] = useState<boolean>(false);
    const [isCatFriendly, setIsCatFriendly] = useState<boolean>(false);
    const [isMicrochipped, setIsMicrochipped] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [customAloneTime, setCustomAloneTime] = useState('');
    const [feedingSchedule, setFeedingSchedule] = useState('');
    const [pottyBreakCustom, setPottyBreakCustom] = useState('');
    const [pottyBreakSchedule, setPottyBreakSchedule] = useState('');
    const [customFeedingSchedule, setCustomFeedingSchedule] = useState('');
    const [vetInfo, setVetInfo] = useState({
        vetName: '',
        vetAddress: '',
        vetPhone: ''
    });
    const [petInfo, setPetInfo] = useState({
        description: '',
        petName: '',
        petWeight: '',
        petAgeYears: '',
        petAgeMonths: '',
        petSex: isMale,
        petBreeds: '',
        isMicrochipped: isMicrochipped,
        isSpayed: '',
        isHouseTrained: '',
        isFriendlyWithChildren: '',
        isFriendlyWithDogs: '',
        isFriendlyWithCats: '',
        adoptionDate: '',
        aboutPet: ''
    });

    const today = new Date();
    const day = today.getDate().toString().padStart(2, '0'); // Get the day (1-31) and pad with zero if needed
    const month = (today.getMonth() + 1).toString().padStart(2, '0'); // Get the month (0-11); +1 to make it 1-12 and pad with zero if needed
    const year = today.getFullYear(); // Get the year (e.g., 2023)

    // Provided date in MM/DD/YYYY format
    const providedDate = `${month}/${day}/${year}`;

    // Convert to YYYY-MM-DD format
    const parts = providedDate.split('/');
    const formattedDate = `${parts[2]}-${parts[0].padStart(2, '0')}-${parts[1].padStart(2, '0')}`;

    const handlePetSexChange = (value: string) => {
        if (value === 'male') {
            setIsMale(true);
        } else if (value === 'female') {
            setIsMale(false);
        }
    };

    const handleIsMicrochipped = (value: string) => {
        if (value === 'Yes') {
            setIsMicrochipped(true);
        } else if (value === 'No') {
            setIsMicrochipped(false);
        }
    };

    const handleIsSpayed = (value: string) => {
        if (value === 'Yes') {
            setIsSpayed(true);
        } else if (value === 'No') {
            setIsSpayed(false);
        }
    };

    const handleIsHouseTrained = (value: string) => {
        if (value === 'Yes') {
            setIsHouseTrained(true);
        } else if (value === 'No') {
            setIsHouseTrained(false);
        }
    };
    const handleIsChildFriendly = (value: string) => {
        if (value === 'Yes') {
            setIsChildFriendly(true);
        } else if (value === 'No') {
            setIsChildFriendly(false);
        }
    };
    const handleIsDogFriendly = (value: string) => {
        if (value === 'Yes') {
            setIsDogFriendly(true);
        } else if (value === 'No') {
            setIsDogFriendly(false);
        }
    };
    const handleIsCatFriendly = (value: string) => {
        if (value === 'Yes') {
            setIsCatFriendly(true);
        } else if (value === 'No') {
            setIsCatFriendly(false);
        }
    };

    const handlePetInfoChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = event.target;
        setPetInfo({ ...petInfo, [id]: value });
    };

    const handleVetInfoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = event.target;
        setVetInfo({ ...vetInfo, [id]: value });
    };

    const handlePottyBreakScheduleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setPottyBreakSchedule(value);
        if (value === 'custom') {
            // Show the textarea
            setPottyBreakCustom('');
        }
    };

    const handlePottyBreakCustomChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setPottyBreakCustom(event.target.value);
    };

    const handleEnergyLevelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setEnergyLevel(value);
    };

    const handleAloneTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setAloneTime(value);
        if (value === 'customAlone') {
            // Show the textarea
            setCustomAloneTime('');
        }
    };

    const handleCustomAloneTimeChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setCustomAloneTime(event.target.value);
    };

    const handleFeedingScheduleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setFeedingSchedule(value);
        if (value === 'customFeeding') {
            // Show the textarea
            setCustomFeedingSchedule('');
        }
    };

    const handleCustomFeedingScheduleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setCustomFeedingSchedule(event.target.value);
    };

    const handleSavePetButton = (e: any) => {
        e.preventDefault();
        setLoading(true);
    };
    
    return (
        <div className="w-full md:w-4/5 lg:w-2/4 md:mx-auto bg-gray-50 px-4 py-8 sm:px-16 space-y-4 mt-8 mb-8 rounded-2xl border border-gray-100 shadow-xl">
            <h1 className="text-2xl text-blue-800 font-bold mb-4">Tell us about your pet</h1>

            <form onSubmit={handleSavePetButton} >
                {/* Pet Photo */}
                <label htmlFor="petPhoto" className="block text-xs text-gray-600 uppercase">Update Pet Photo</label>
                <input id="petPhoto" type="file" className="w-full mt-1 block rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm sm:text-sm" />

                {/* Pet Details */}
                <h2 className="text-xl text-blue-800 font-bold">Pet details</h2>
                <div className="space-y-4">
                    {/* Description */}
                    <div>
                        <label htmlFor="description" className="block text-xs text-gray-600 uppercase">Provide a description of your pet</label>
                    </div>

                    {/* Name */}
                    <div>
                        <label htmlFor="petName" className="block text-xs text-gray-600 uppercase">Name</label>
                        <input value={petInfo.petName} onChange={handlePetInfoChange} id="petName" type="text" className="w-full mt-1 block rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm sm:text-sm" />
                    </div>

                    {/* Weight (lbs) */}
                    <div>
                        <label htmlFor="petWeight" className="block text-xs text-gray-600 uppercase">Weight (lbs)</label>
                        <input value={petInfo.petWeight} onChange={handlePetInfoChange} id="petWeight" type="text" className="w-full mt-1 block rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm sm:text-sm" />
                    </div>

                    {/* in Years and Months */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="petAgeYears" className="block text-xs text-gray-600 uppercase">Age (Yr.) Years</label>
                            <input value={petInfo.petAgeYears} onChange={handlePetInfoChange} id="petAgeYears" type="text" className="w-full mt-1 block rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm sm:text-sm" />
                        </div>
                        <div>
                            <label htmlFor="petAgeMonths" className="block text-xs text-gray-600 uppercase">Age (Mo.) Months</label>
                            <input value={petInfo.petAgeMonths} onChange={handlePetInfoChange} id="petAgeMonths" type="text" className="w-full mt-1 block rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm sm:text-sm" />
                        </div>
                    </div>

                    {/* Sex (Radio Buttons) */}
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

                    {/* Breed(s) */}
                    <div>
                        <label htmlFor="petBreeds" className="block text-xs text-gray-600 uppercase">Breed(s)</label>
                        <input value={petInfo.petBreeds} onChange={handlePetInfoChange} id="petBreeds" type="text" className="w-full mt-1 block rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm sm:text-sm" />
                        <p className="text-xs text-gray-600">Enter all breeds that apply. If your dog is a mixed breed, add ‘Mixed’ as well.</p>
                    </div>

                    <h2 className="text-xl text-blue-800 font-bold">Additional details</h2>
                    {/* Microchipped? */}
                    <div>
                        <label className="block text-xs text-gray-600 uppercase">Microchipped?</label>
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

                    {/* Spayed/Neutered? */}
                    <div>
                        <label className="block text-xs text-gray-600 uppercase">Spayed/Neutered?</label>
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

                    {/* House trained? */}
                    <div>
                        <label className="block text-xs text-gray-600 uppercase">House trained?</label>
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

                    {/* Friendly with children? */}
                    <div>
                        <label className="block text-xs text-gray-600 uppercase">Friendly with children?</label>
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

                    {/* Friendly with dogs? */}
                    <div>
                        <label className="block text-xs text-gray-600 uppercase">Friendly with dogs?</label>
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

                    {/* Friendly with cats? */}
                    <div>
                        <label className="block text-xs text-gray-600 uppercase">Friendly with cats?</label>
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

                    {/* Adoption date */}
                    <div>
                        <label className="block text-xs text-gray-600 uppercase">Adoption date</label>
                        <input defaultValue={formattedDate} onChange={handlePetInfoChange} id="adoptionDate" type="date" className="w-full mt-1 block rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm sm:text-sm" />
                    </div>

                    {/* About your pet */}
                    <div>
                        <label className="block text-xs text-gray-600 uppercase">About your pet</label>
                        <textarea value={petInfo.aboutPet} onChange={handlePetInfoChange} id="aboutPet" className="w-full mt-1 block rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm sm:text-sm"></textarea>
                    </div>

                    <h2 className="text-xl text-blue-800 font-bold">Care Info</h2>
                    {/* Potty break schedule */}
                    <div>
                        <div>
                            <label className="block text-xs text-gray-600 uppercase">Potty break schedule</label>
                            <div>
                                <input
                                    type="radio"
                                    id="everyHour"
                                    name="pottyBreakSchedule"
                                    value="everyHour"
                                    checked={pottyBreakSchedule === 'everyHour'}
                                    onChange={handlePottyBreakScheduleChange}
                                />
                                <label htmlFor="everyHour">Every hour</label>
                            </div>
                            <div>
                                <input
                                    type="radio"
                                    id="2hours"
                                    name="pottyBreakSchedule"
                                    value="2hours"
                                    checked={pottyBreakSchedule === '2hours'}
                                    onChange={handlePottyBreakScheduleChange}
                                />
                                <label htmlFor="2hours">Every 2 hours</label>
                            </div>
                            <div>
                                <input
                                    type="radio"
                                    id="4hours"
                                    name="pottyBreakSchedule"
                                    value="4hours"
                                    checked={pottyBreakSchedule === '4hours'}
                                    onChange={handlePottyBreakScheduleChange}
                                />
                                <label htmlFor="4hours">Every 4 hours</label>
                            </div>
                            <div>
                                <input
                                    type="radio"
                                    id="8hours"
                                    name="pottyBreakSchedule"
                                    value="8hours"
                                    checked={pottyBreakSchedule === '8hours'}
                                    onChange={handlePottyBreakScheduleChange}
                                />
                                <label htmlFor="8hours">Every 8 hours</label>
                            </div>
                            <div>
                                <input
                                    type="radio"
                                    id="custom"
                                    name="pottyBreakSchedule"
                                    value="custom"
                                    checked={pottyBreakSchedule === 'custom'}
                                    onChange={handlePottyBreakScheduleChange}
                                />
                                <label htmlFor="custom">Custom</label>
                            </div>
                            {pottyBreakSchedule === 'custom' && (
                                <textarea
                                    value={pottyBreakCustom}
                                    onChange={handlePottyBreakCustomChange}
                                    placeholder="Enter custom schedule"
                                />
                            )}
                        </div>
                    </div>

                    {/* Energy Level */}
                    <div>
                        <div>
                            <label className="block text-xs text-gray-600 uppercase">Energy Level</label>
                            <div>
                                <input
                                    type="radio"
                                    id="high"
                                    name="energyLevel"
                                    value="high"
                                    checked={energyLevel === 'high'}
                                    onChange={handleEnergyLevelChange}
                                />
                                <label htmlFor="high">High</label>
                            </div>
                            <div>
                                <input
                                    type="radio"
                                    id="moderate"
                                    name="energyLevel"
                                    value="moderate"
                                    checked={energyLevel === 'moderate'}
                                    onChange={handleEnergyLevelChange}
                                />
                                <label htmlFor="moderate">Moderate</label>
                            </div>
                            <div>
                                <input
                                    type="radio"
                                    id="low"
                                    name="energyLevel"
                                    value="low"
                                    checked={energyLevel === 'low'}
                                    onChange={handleEnergyLevelChange}
                                />
                                <label htmlFor="low">Low</label>
                            </div>
                        </div>
                    </div>

                    {/* Feeding schedule */}
                    <div>
                        <div>
                            <label className="block text-xs text-gray-600 uppercase">Feeding schedule</label>
                            <div>
                                <input
                                    type="radio"
                                    id="morning"
                                    name="feedingSchedule"
                                    value="morning"
                                    checked={feedingSchedule === 'morning'}
                                    onChange={handleFeedingScheduleChange}
                                />
                                <label htmlFor="morning">Morning</label>
                            </div>
                            <div>
                                <input
                                    type="radio"
                                    id="twiceADay"
                                    name="feedingSchedule"
                                    value="twiceADay"
                                    checked={feedingSchedule === 'twiceADay'}
                                    onChange={handleFeedingScheduleChange}
                                />
                                <label htmlFor="twiceADay">Twice a day</label>
                            </div>
                            <div>
                                <input
                                    type="radio"
                                    id="customFeeding"
                                    name="feedingSchedule"
                                    value="customFeeding"
                                    checked={feedingSchedule === 'customFeeding'}
                                    onChange={handleFeedingScheduleChange}
                                />
                                <label htmlFor="customFeeding">Custom</label>
                            </div>
                            {feedingSchedule === 'customFeeding' && (
                                <textarea
                                    value={customFeedingSchedule}
                                    onChange={handleCustomFeedingScheduleChange}
                                    placeholder="Enter custom feeding schedule"
                                />
                            )}
                        </div>
                    </div>

                    {/* Can be left alone */}
                    <div>
                        <div>
                            <label className="block text-xs text-gray-600 uppercase">Can be left alone</label>
                            <div>
                                <input
                                    type="radio"
                                    id="lessThan1"
                                    name="aloneTime"
                                    value="<1hour"
                                    checked={aloneTime === '<1hour'}
                                    onChange={handleAloneTimeChange}
                                />
                                <label htmlFor="lessThan1">&lt; 1 hour</label>
                            </div>
                            <div>
                                <input
                                    type="radio"
                                    id="1to4"
                                    name="aloneTime"
                                    value="1-4hours"
                                    checked={aloneTime === '1-4hours'}
                                    onChange={handleAloneTimeChange}
                                />
                                <label htmlFor="1to4">1-4 hours</label>
                            </div>
                            <div>
                                <input
                                    type="radio"
                                    id="4to8"
                                    name="aloneTime"
                                    value="4-8hours"
                                    checked={aloneTime === '4-8hours'}
                                    onChange={handleAloneTimeChange}
                                />
                                <label htmlFor="4to8">4-8 hours</label>
                            </div>
                            <div>
                                <input
                                    type="radio"
                                    id="customAlone"
                                    name="aloneTime"
                                    value="customAlone"
                                    checked={aloneTime === 'customAlone'}
                                    onChange={handleAloneTimeChange}
                                />
                                <label htmlFor="customAlone">Custom</label>
                            </div>
                            {aloneTime === 'customAlone' && (
                                <textarea
                                    value={customAloneTime}
                                    onChange={handleCustomAloneTimeChange}
                                    placeholder="Enter custom time"
                                />
                            )}
                        </div>
                    </div>

                    {/* Medication */}
                    <div>
                        <label className="block text-xs text-gray-600 uppercase">Medication (select all that apply)</label>
                        <div className="flex space-x-4">
                            <input id="medicationPill" type="checkbox" value="medicationPill" />
                            <label htmlFor="medicationTopical">Pill</label>
                            <input id="medicationTopical" type="checkbox" value="medicationTopical" />
                            <label htmlFor="medicationTopical">Topical</label>
                            <input id="medicationInjection" type="checkbox" value="medicationInjection" />
                            <label htmlFor="medicationInjection">Injection</label>
                        </div>
                    </div>

                    {/* Anything else a sitter should know? */}
                    <div>
                        <label className="block text-xs text-gray-600 uppercase">Anything else a sitter should know?</label>
                        <textarea id="additionalInfo" className="w-full mt-1 block rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm sm:text-sm"></textarea>
                    </div>

                    {/* Add details about your pets health and care providers */}
                    <div>
                        <label className="block text-xs text-gray-600 uppercase">Add details about your pet&apos;s health and care providers</label>
                        <textarea id="healthInfo" className="w-full mt-1 block rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm sm:text-sm"></textarea>
                    </div>

                    <h2 className="text-xl text-blue-800 font-bold">Health Info</h2>
                    {/* Veterinary info */}
                    <div>
                        <div className='grid grid-cols-2 gap-4'>
                            <div>
                                <label className="block text-xs text-gray-600 uppercase">Veterinary Name</label>
                                <input
                                    id="vetName"
                                    type="text"
                                    value={vetInfo.vetName}
                                    onChange={handleVetInfoChange}
                                    className="w-full mt-1 block rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm sm:text-sm"
                                    placeholder=""
                                />
                            </div>
                            <div>
                                <label className="block text-xs text-gray-600 uppercase">Veterinary Phone</label>
                                <input
                                    id="vetPhone"
                                    type="tel"
                                    value={vetInfo.vetPhone}
                                    onChange={handleVetInfoChange}
                                    className="w-full mt-1 block rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm sm:text-sm"
                                    placeholder=""
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs text-gray-600 uppercase mt-5">Veterinary Address</label>
                            <input
                                id="vetAddress"
                                type="text"
                                value={vetInfo.vetAddress}
                                onChange={handleVetInfoChange}
                                className="w-full my-2 block rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm sm:text-sm"
                                placeholder=""
                            />
                        </div>
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

type TRadioButton = {
    inputType: string,
    labelName: string,
    labelText: string,
    condition: boolean,
    compareCondition: boolean,
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

export default PetForm;
