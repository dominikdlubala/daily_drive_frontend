import { useForm } from "react-hook-form"
import Tab from "../../../components/tab_manager/Tab"
import TabManager from "../../../components/tab_manager/TabManager"
import * as z from 'zod'; 
import { zodResolver } from '@hookform/resolvers/zod';
import { Input, ControlledSelect } from "../../../components/primitives/inputs/Inputs";

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



export default function CreateExerciseForm() {

  return (
    <TabManager> 
      <Tab id="weightExercise" title={'Siłowe'}>
        <CreateWeightExerciseForm />
      </Tab>
      <Tab id="cardioExercise" title={'Cardio'}>
        <CreateCardioExerciseForm />
      </Tab>
    </TabManager>
  )
}