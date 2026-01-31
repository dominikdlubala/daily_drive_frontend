import { AddPerformedExerciseDTO, AddPerformedSetDTO } from "../../../types";
import { FaTrashAlt } from "react-icons/fa";
import { ArrayPath, Control, Controller, FieldValues, Path, useFieldArray } from "react-hook-form";
import { ChangeEvent, useEffect, useState } from "react";

interface ExerciseDetailsProps<T extends FieldValues>  {
    index: number; 
    exercise: AddPerformedExerciseDTO;
    control: Control<T>
    name: Path<T>;
}

export default function ExerciseDetails<T extends FieldValues>({ 
    index, 
    exercise, 
    control, 
    name
}: ExerciseDetailsProps<T>) {

    const { fields, append, remove } = useFieldArray({
        control, 
        name: `${name}.sets` as ArrayPath<T>
    })

    return (
        <div className="exercise_details">
            <div className="exercise_details-header">
                <h3 className="exercise_detail-title">{exercise.name}</h3>
                <FaTrashAlt
                    className="form_list-item--delete btn-delete"
                />
            </div>
                <div className="exercise_details--weight">
                {fields.map((field, setIndex) => {

                    const setPath = `${name}.sets.${setIndex}` as Path<T>;

                    const commonProps = {
                        key: field.id, 
                        setIndex: setIndex, 
                        control: control, 
                        basePath: setPath, 
                        onDelete: () => remove(setIndex)
                    }

                    if(exercise.unit === 'KGxREPS'){
                        return <WeightSet {...commonProps} key={setIndex} />
                    } else if (exercise.unit === 'REPS') {
                        return <RepSet {...commonProps} key={setIndex} />
                    } else if (exercise.unit === 'TIME') {
                        return <DurationSet {...commonProps} key={setIndex} />
                    }
                    return null; 
                })}
                <button 
                    type="button" 
                    className="btn-add btn-add"
                    onClick={() => (append as any)({
                        setNumber: fields.length +  1, 
                    })}
                >Dodaj serię</button>
            </div>
        </div>
  );
}

interface SetComponentProps<T extends FieldValues> {
    setIndex: number;
    control: Control<T>;
    basePath: Path<T>; 
    onDelete: () => void; 
}


const WeightSet = <T extends FieldValues>({
    setIndex, 
    control, 
    basePath, 
    onDelete,
}: SetComponentProps<T>) => {

    return (
        <div className="exercise_detail">
            <h4 className="exercise_detail-title">Seria {setIndex+1}</h4>
            <div className="exercise_detail-right">
                <div className="split-input_container">
                    <div className="split-input_item">
                        <Controller 
                            control={control}
                            name={`${basePath}.weight` as Path<T>}
                            render={({ field }) => (
                                <input
                                    {...field}
                                    type="number"
                                    placeholder="KG"
                                    step={2}
                                    className="split-input_field"
                                    onChange={(e) => field.onChange(parseFloat(e.target.value))}
                                    max={999}
                                    min={1}
                                />
                            )}
                        />
                    </div>
                    <span className="split-input_separator">x</span>
                    <div className="split-input_item">
                        <Controller 
                            control={control}
                            name={`${basePath}.reps` as Path<T>}
                            render={({ field }) => (
                                <input
                                    {...field}
                                    type="number"
                                    step={1}
                                    placeholder="REP"
                                    onChange={(e) => field.onChange(parseInt(e.target.value))}
                                    className="split-input_field"
                                    max={200}
                                    min={1}
                                />
                            )}
                        />
                    </div>
                </div>
                <button type="button" className="btn btn-remove">
                    <FaTrashAlt onClick={onDelete}/>
                </button>
            </div>
        </div>
    )
}

const RepSet = <T extends FieldValues>({
    setIndex, 
    control, 
    basePath, 
    onDelete,
}: SetComponentProps<T>) => {

    return (
        <div className="exercise_detail">
            
            <h4 className="exercise_detail-title">Seria {setIndex+1}</h4>
            <div className="exercise_detail-right">
                <Controller 
                    control={control}
                    name={`${basePath}.reps` as Path<T>}
                    render={({ field }) => (
                        <input
                            {...field}
                            type="number"
                            placeholder="REP"
                            className="exercise-detail--input"
                            onChange={(e) => field.onChange(parseInt(e.target.value))}
                            max={200}
                            min={1}
                        />
                    )}
                />
                <button type="button" className="btn btn-remove">
                    <FaTrashAlt onClick={onDelete}/>
                </button>
            </div>
        </div>
    )
}

const DurationSet = <T extends FieldValues>({
    setIndex, 
    control, 
    basePath, 
    onDelete,
}: SetComponentProps<T>) => {

    return (
        <div className="exercise_detail">
            
            <h4 className="exercise_detail-title">Seria {setIndex + 1}</h4>
            <div className="exercise_detail-right">
                <Controller 
                    control={control}
                    name={`${basePath}.duration` as Path<T>}
                    render={({ field: { onChange, value} }) => {
                        
                        const [min, setMin] = useState('')
                        const [sec, setSec] = useState('')

                        useEffect(() => {
                            if(!value) return; 
                            const minutes = Math.floor(value/60); 
                            const seconds = value - (minutes*60); 
                            setMin(`${minutes}` || ''); 
                            setSec(`${seconds}` || '00'); 
                        }, [value])

                        const handleMinChange = (e: ChangeEvent<HTMLInputElement>) => {
                            const newMin = e.currentTarget.value; 
                            setMin(newMin); 
                            onChange((parseInt(newMin)*60) + sec);
                        }
                        const handleSecChange = (e: ChangeEvent<HTMLInputElement>) => {
                            let newSec = e.target.value; 
                            if(parseInt(newSec) > 59) newSec = '59'; 
                            setSec(newSec); 
                            onChange((parseInt(min)*60) + parseInt(newSec))
                        }

                        return (
                            <div className="split-input_container">
                                <div className="split-input_item">
                                    <input  
                                        value={min}
                                        type="number"
                                        placeholder="00"
                                        className="split-input_field"
                                        onChange={handleMinChange}
                                    />
                                </div>
                                <span className="split-input_separator">:</span>
                                <div className="split-input_item">
                                    <input
                                        value={sec}
                                        type="number"
                                        placeholder="00"
                                        className="split-input_field"
                                        onChange={handleSecChange}
                                    />
                                </div>
                            </div>
                        )}}
                    />
                <button type="button" className="btn btn-remove">
                    <FaTrashAlt onClick={onDelete}/>
                </button>
            </div>
        </div>
    )
}