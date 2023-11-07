"use client"
import React, { useState } from 'react';
import LoadingDots from './loading-dots';

const PetForm = () => {
    const [aloneTime, setAloneTime] = useState<number>(4);
    const [energyLevel, setEnergyLevel] = useState<number>(2);
    const [isMale, setIsMale] = useState<boolean>(false);
    const [isSpayed, setIsSpayed] = useState<boolean>(false);
    const [isHouseTrained, setIsHouseTrained] = useState<boolean>(false);
    const [isChildFriendly, setIsChildFriendly] = useState<boolean>(false);
    const [isDogFriendly, setIsDogFriendly] = useState<boolean>(false);
    const [isCatFriendly, setIsCatFriendly] = useState<boolean>(false);
    const [isMicrochipped, setIsMicrochipped] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [customAloneTime, setCustomAloneTime] = useState('');
    const [feedingSchedule, setFeedingSchedule] = useState<number>(1);
    const [pottyBreakCustom, setPottyBreakCustom] = useState('');
    const [pottyBreakSchedule, setPottyBreakSchedule] = useState<number>(2);
    const [customFeedingSchedule, setCustomFeedingSchedule] = useState('');
    const [isMedPill, setIsMedPill] = useState<boolean>(false);
    const [isMedTopical, setIsMedTopical] = useState<boolean>(false);
    const [isMedInjection, setIsMedInjection] = useState<boolean>(false);
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

    const handlePottyBreakScheduleChange = (value: number) => {
        
        setPottyBreakSchedule(value);
        if (value === 0) {
            // Show the textarea
            setPottyBreakCustom('');
        }
    };

    const handlePottyBreakCustomChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setPottyBreakCustom(event.target.value);
    };

    const handleEnergyLevelChange = (value: number) => {
        setEnergyLevel(value);
    };

    const handleAloneTimeChange = (value: number) => {
        setAloneTime(value);
        if (value === 0) {
            // Show the textarea
            setCustomAloneTime('');
        }
    };

    const handleCustomAloneTimeChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setCustomAloneTime(event.target.value);
    };

    const handleFeedingScheduleChange = (value: number) => {
        setFeedingSchedule(value);
        if (value === 0) {
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
                    <div className="block text-xs text-gray-600 uppercase">Provide a description of your pet</div>

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
                        <input defaultValue={formattedDate} onChange={handlePetInfoChange} id="adoptionDate" type="date" className="w-full mt-1 block rounded-md border border-gray-300 px-3 py-2 text-green-800 shadow-sm sm:text-sm" />
                    </div>

                    {/* About your pet */}
                    <div>
                        <label className="block text-xs text-gray-600 uppercase">About your pet</label>
                        <textarea value={petInfo.aboutPet} onChange={handlePetInfoChange} id="aboutPet" className="w-full mt-1 block rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm sm:text-sm"></textarea>
                    </div>

                    <h2 className="text-xl text-blue-800 font-bold">Care Info</h2>
                    {/* Potty break schedule */}
                    <div>
                        <div className="block text-xs text-gray-600 uppercase">Potty break schedule</div>
                        <div className="grid grid-cols-2 gap-2">
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

                    {/* Energy Level */}
                    <div>
                        <div className="block text-xs text-gray-600 uppercase">Energy Level</div>
                        <div className="grid grid-cols-2 gap-2">
                            <ConditionalRadioButton
                                inputType={'radio'}
                                labelName={'high'}
                                labelText={'High'}
                                condition={energyLevel}
                                compareCondition={3}
                                onClick={async () => handleEnergyLevelChange(3)}
                            />
                            <ConditionalRadioButton
                                inputType={'radio'}
                                labelName={'moderate'}
                                labelText={'Moderate'}
                                condition={energyLevel}
                                compareCondition={2}
                                onClick={async () => handleEnergyLevelChange(2)}
                            />
                            <ConditionalRadioButton
                                inputType={'radio'}
                                labelName={'low'}
                                labelText={'Low'}
                                condition={energyLevel}
                                compareCondition={1}
                                onClick={async () => handleEnergyLevelChange(1)}
                            />
                        </div>
                    </div>

                    {/* Feeding schedule */}
                    <div>
                        <div className="block text-xs text-gray-600 uppercase">Feeding schedule</div>
                        <div className="grid grid-cols-2 gap-2">
                            <ConditionalRadioButton
                                inputType={'radio'}
                                labelName={'morning'}
                                labelText={'Morning'}
                                condition={feedingSchedule}
                                compareCondition={2}
                                onClick={async () => handleFeedingScheduleChange(2)}
                            />
                                
                            <ConditionalRadioButton
                                inputType={'radio'}
                                labelName={'twiceADay'}
                                labelText={'Twice a day'}
                                condition={feedingSchedule}
                                compareCondition={1}
                                onClick={async () => handleFeedingScheduleChange(1)}
                            />
                                
                            <ConditionalRadioButton
                                inputType={'radio'}
                                labelName={'customFeeding'}
                                labelText={'Custom'}
                                condition={feedingSchedule}
                                compareCondition={0}
                                onClick={async () => handleFeedingScheduleChange(0)}
                            />
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

                    {/* Can be left alone */}
                    <div>
                        <div className="block text-xs text-gray-600 uppercase">Can be left alone</div>
                        <div className="grid grid-cols-2 gap-2">
                            <div className="col-span-1 md:col-span-2 lg:col-span-1">
                                <ConditionalRadioButton
                                    inputType={'radio'}
                                    labelName={'lessThan1'}
                                    labelText={`< 1 hour`}
                                    condition={aloneTime}
                                    compareCondition={1}
                                    onClick={async () => handleAloneTimeChange(1)}
                                />
                            </div>

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

                    {/* Medication */}
                    <div>
                        <div className="block text-xs text-gray-600 uppercase">Medication (select all that apply)</div>
                        <div className="grid grid-cols-2 gap-2">

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
    condition: boolean | number,
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

export default PetForm;
