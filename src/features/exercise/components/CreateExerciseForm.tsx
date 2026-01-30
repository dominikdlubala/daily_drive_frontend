import { useForm } from "react-hook-form"
import Tab from "../../../components/tab_manager/Tab"
import TabManager from "../../../components/tab_manager/TabManager"
import * as z from 'zod'; 
import { zodResolver } from '@hookform/resolvers/zod';
import { Input, ControlledSelect } from "../../../components/primitives/inputs/Inputs";
import { useCreateExerciseDefinitionMutation } from "src/api/queries/exerciseApi";
import { BODY_PARTS_LIST, CreateExerciseDefinitionDTO } from "src/types";
import { closeModalByType } from "src/store";
import { useAppDispatch } from "src/hooks/useAppDispatch";

const weightExerciseFormSchema = z.object({
  name: z.string().min(1, { message: 'Ćwiczenie musi mieć nazwę'}), 
  bodyParts: z.array(z.string()).min(1, { message: 'Wybierz conajmniej jedną grupę mięśni' })
})

type WeightExerciseFormValues = z.infer<typeof weightExerciseFormSchema>; 

const CreateWeightExerciseForm = () => {

  const bodyPartOptions = [
    { label: 'Klatka', value: 'Chest'}, 
    { label: 'Plecy', value: 'Back'}, 
    { label: 'Ramiona', value: 'Arms'}, 
    { label: 'Nogi', value: 'Legs'}, 
    { label: 'Barki', value: 'Shoulders'}, 
    { label: 'Brzuch', value: 'Abs'}, 
  ]; 

  const {
    register, 
    handleSubmit, 
    control, 
    formState: { errors, isLoading }
  } = useForm<WeightExerciseFormValues>({
    resolver: zodResolver(weightExerciseFormSchema), 
    defaultValues: {
      name: "", 
      bodyParts: []
    }
  }); 

  const onSubmit = (data: WeightExerciseFormValues) => {
    console.log(data); 
  }

  return (
    <form className="form create-exercise__form" onSubmit={handleSubmit(onSubmit)}>
      <div className="form__group">
        <label>Nazwa ćwiczenia</label>
        <Input
          control={control}
          name="name"
        />
      </div>
      <div className="form__group">
        <label>Grupa mięśniowa</label>
        <ControlledSelect 
          control={control}
          name="bodyParts"
          options={bodyPartOptions}
          multiple={true}
        />
      </div>
      <div className="form__group">
        <button
          className="form__submit button"
          disabled={isLoading}
        >Zatwierdź</button>
      </div>
    </form>    
  )
}


const cardioExerciseFormSchema = z.object({
  name: z.string().min(1, { message: 'Ćwiczenie musi posiadać nazwę'}), 
  caloriePerHour: z.coerce.number<number>('Podaj liczbę spalanych kalorii').min(30, { message: 'Kalorie muszą być w przedziale 30-600'}).max(600, { message: 'Kalorie muszą być w przedziale 30-600'})
})

type CardioExerciseFormValues = z.infer<typeof cardioExerciseFormSchema>; 



const CreateCardioExerciseForm = () => {

  const {
    control, 
    handleSubmit,
    formState: { isLoading }
  } = useForm<CardioExerciseFormValues>({
    resolver: zodResolver(cardioExerciseFormSchema), 
    defaultValues: {
      name: "", 
    }
  })

  const onSubmit = (data: CardioExerciseFormValues) => {
    console.log(data); 
  }

  return (
    <form className="form create-exercise__form" onSubmit={handleSubmit(onSubmit)}>
      <div className="form__group">
        <label>Nazwa ćwiczenia</label>
        <Input 
          control={control}
          name="name"
        />
      </div>
      <div className="form__group">
        <label>Spalone kcal/h</label>
        <Input
          control={control}
          name="caloriePerHour"
          type="number"
        />
      </div>

      <div className="form__group">
        <button
          className="form__submit button"
          disabled={isLoading}
        >Zatwierdź</button>
      </div>
    </form>    
  )
}

  
const exerciseFormSchema = z.object({
  name: z.string().min(1, { message: 'Ćwiczenie musi mieć nazwę'}), 
  unit: z.string().min(1, { message: 'Musisz wybrać jednostkę' }),
  bodyParts: z.array(z.string()).optional()
}).superRefine(({ unit, bodyParts }, refinementContext) => {
  if( (unit === 'KGxREPS' || unit === 'REPS') && bodyParts?.length === 0 ) {
    return refinementContext.addIssue({
      code: "custom", 
      message: 'Wybierz conajmniej jedną partię ciała', 
      path: ['bodyParts']
    })
  }
})

type ExerciseFormValues = z.infer<typeof exerciseFormSchema> 

export default function CreateExerciseForm() {

  const bodyPartOptions = [
    { label: 'Klatka', value: 'Chest'}, 
    { label: 'Plecy', value: 'Back'}, 
    { label: 'Ramiona', value: 'Arms'}, 
    { label: 'Nogi', value: 'Legs'}, 
    { label: 'Barki', value: 'Shoulders'}, 
    { label: 'Brzuch', value: 'Abs'}, 
    { label: 'Triceps', value: 'Triceps' }, 
    { label: 'Biceps', value: 'Biceps' }
  ]; 

  const unitOptions = [
    { label: 'KGxPOWTÓRZENIA', value: 'KGxREPS'}, 
    { label: 'POWTÓRZENIA', value: 'REPS'}, 
    { label: 'CZAS', value: 'TIME'}, 
  ]

  const dispatch = useAppDispatch(); 

  const [
    createExerciseDefinition, 
    { data, isLoading, isSuccess } 
  ] = useCreateExerciseDefinitionMutation(); 

  const {
    handleSubmit, 
    control, 
    formState: { errors }, 
    watch
  } = useForm<ExerciseFormValues>({
    resolver: zodResolver(exerciseFormSchema), 
    defaultValues: {
      name: "", 
      bodyParts: [], 
      unit: ""
    }
  }); 

  const onSubmit = async (data: ExerciseFormValues) => {

    const response = await createExerciseDefinition({
      ...data, 
      bodyParts: data.bodyParts?.map(bp => {
        return { name: bp }
      }) 
    }); 
    if(!response.error) {
      dispatch(closeModalByType('CREATE_EXERCISE')); 
    }
  }
  const unitValue = watch('unit'); 

  return (
    <form className="form create-exercise_form" onSubmit={handleSubmit(onSubmit)}>
      <h3 className="form_title">Dodaj ćwiczenie</h3>
      <div className="form_group">
        <label>Nazwa ćwiczenia</label>
        <Input
          control={control}
          name="name"
        />
      </div>
      <div className="form_group">
        <label>Jednostka</label>
        <ControlledSelect 
          control={control}
          name="unit"
          options={unitOptions}
        />
      </div>
      {
        (unitValue === 'KGxREPS' || unitValue === 'REPS')
        &&
        <div className="form_group">
          <label>Grupa mięśniowa</label>
          <ControlledSelect 
            control={control}
            name="bodyParts"
            options={bodyPartOptions}
            multiple={true}
          />
        </div>
      }
      <div className="form_group">
        <button
          className="form_submit button"
          type="submit"
        >
          {!isLoading ? `Zatwierdź` : 'Zapisuję...'}
        </button>
      </div>
    </form>    
  )
}