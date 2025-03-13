import { useForm, SubmitHandler, useFieldArray, useWatch } from "react-hook-form";
import { Meal, Product } from "../../types";
import ProductSearch from "./ProductSearch";
import { MdDelete } from "react-icons/md";
import { useState, useRef } from "react";
import ProductForm from "./ProductForm";
import { updateMeal } from "../../services/DietService";

interface MealFormProps {
    initialData?: Meal;
    handleModalClose: () => void; 
}

export default function MealForm({ initialData, handleModalClose }: MealFormProps) {

    const [modalOpen, setModalOpen] = useState(false); 
    const topRef = useRef<HTMLDivElement>(null);

    const { register, handleSubmit, control } = useForm<Meal>({
        defaultValues: initialData
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "products"
    });

    const onProductSelect = (product: Product) => {
        append(product); 
    }

    const onSubmit: SubmitHandler<Meal> = async (data: Meal) => {
        console.log(data); 
        const { data: responseData, error } = await updateMeal(data);
        if(error) {
            console.error(error); 
        } else {
            console.log(responseData); 
        }
        handleModalClose(); 
    };

    const products = useWatch({ control, name: "products" });

    const handleProductSubmit = (product: Product) => {
        append(product);
        setModalOpen(false);
    }

    const handleAddProductClick = () => {
        setModalOpen(true);
        if (topRef.current) {
            topRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }

    return (
        <>
            {
                modalOpen 
                &&
                <ProductForm onSubmit={handleProductSubmit} onCancel={() => setModalOpen(false)} />
            }

            <form onSubmit={handleSubmit(onSubmit)} className="meal-form">
                <div ref={topRef} className="form-group">
                    <label htmlFor="name">Posiłek</label>
                    <input id="name" {...register("name")} />
                </div>
                <div className="form-group">
                    <label>Produkty</label>
                    <ProductSearch handleSelect={onProductSelect} />
                    <button type="button" onClick={handleAddProductClick} className="add-button">
                        Dodaj własny produkt
                    </button>
                    {fields.map((field, index) => {
                        const weight = products?.[index]?.weight || 0;

                        return (
                            <div key={field.id} className="product-group">
                                <div className="product-subgroup">
                                    <div className="">
                                        <label htmlFor={`products.${index}.name`}>{field.name}</label>
                                    </div>
                                    <div className="form-subgroup">
                                        <div className="">
                                            {/* <label htmlFor={`products.${index}.weight`}>Waga</label> */}
                                            <input
                                                type="number"
                                                id={`products.${index}.weight`}
                                                {...register(`products.${index}.weight` as const)}
                                                step="0.01"
                                            />
                                            gram
                                        </div>
                                        <button type="button" onClick={() => remove(index)} className="remove-button"><MdDelete/></button>
                                    </div>
                                </div>
                                {field.id  !== 0 ? (
                                    <div className="macro">
                                        <div className="macro-group">
                                            <label>Kalorie: </label>
                                            <p>{Math.ceil(field.caloriesPer100g * (weight *0.01))}</p>
                                        </div>
                                        <div className="macro-group">
                                            <label>B:</label>
                                            <p>{Math.ceil(field.proteinPer100g * (weight * 0.01))}</p>
                                        </div>
                                        <div className="macro-group">
                                            <label>W:</label>
                                            <p>{Math.ceil(field.carbsPer100g * (weight * 0.01))}</p>
                                        </div>
                                        <div className="macro-group">
                                            <label>T:</label>
                                            <p>{Math.ceil(field.fatPer100g * (weight * 0.01))}</p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="macro-inputs">
                                        <div className="form-group">
                                            <label htmlFor={`products.${index}.caloriesPer100g`}>Calories per 100g</label>
                                            <input
                                                type="number"
                                                id={`products.${index}.caloriesPer100g`}
                                                {...register(`products.${index}.caloriesPer100g` as const)}
                                                step="0.01"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor={`products.${index}.proteinPer100g`}>Protein per 100g</label>
                                            <input
                                                type="number"
                                                id={`products.${index}.proteinPer100g`}
                                                {...register(`products.${index}.proteinPer100g` as const)}
                                                step="0.01"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor={`products.${index}.carbsPer100g`}>Carbs per 100g</label>
                                            <input
                                                type="number"
                                                id={`products.${index}.carbsPer100g`}
                                                {...register(`products.${index}.carbsPer100g` as const)}
                                                step="0.01"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor={`products.${index}.fatPer100g`}>Fat per 100g</label>
                                            <input
                                                type="number"
                                                id={`products.${index}.fatPer100g`}
                                                {...register(`products.${index}.fatPer100g` as const)}
                                                step="0.01"
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                        }
                    )}
                    
                </div>
                <button type="submit" className="submit-button">Zapisz</button>
            </form>
        </>
    );
}