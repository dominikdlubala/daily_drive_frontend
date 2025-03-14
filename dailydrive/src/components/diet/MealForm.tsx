import { useForm, SubmitHandler, useFieldArray, useWatch } from "react-hook-form";
import { Meal, Product } from "../../types";
import ProductSearch from "./ProductSearch";
import { MdDelete } from "react-icons/md";
import { useState, useRef } from "react";
import ProductForm from "./ProductForm";

export const round = (value: number, precision: number) => {
    var rounder = Math.pow(10, precision);
    return (Math.round(value * rounder) / rounder).toFixed(precision);
}

interface MealFormProps {
    initialData?: Meal;
    dietId: number;
    handleModalClose: () => void; 
    onFormSubmit: (meal: Meal) => void;
    onDelete: (id: number) => void; 
}

export default function MealForm({ initialData, dietId, handleModalClose, onFormSubmit, onDelete }: MealFormProps) {

    const [modalOpen, setModalOpen] = useState(false); 
    const topRef = useRef<HTMLDivElement>(null);

    const { register, handleSubmit, control } = useForm<Meal>({
        defaultValues: initialData ?? { dailyDietId: dietId }
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "products"
    });

    const onProductSelect = (product: Product) => {
        if(fields.some(p => p.name === product.name)) {
            return `Produkt ${product.name} jest już dodany, zmień wagę zamiast dodawać duplikat`
        } else {
            append(product); 
            return null; 
        }
    }

    const onSubmit: SubmitHandler<Meal> = async (data: Meal) => {
        onFormSubmit(data); 
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
                <div ref={topRef} className="form-group form-group--head">
                    <input className="head-input" id="name" {...register("name")} />
                    {
                        initialData 
                        &&
                        <button type="button" className="btn remove-button" onClick={() => onDelete(initialData.id as number)}>Usuń</button>
                    }
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
                                        <div>
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
                                    <div className="macro">
                                        <div className="macro-group">
                                            <label>Kalorie: </label>
                                            <p>{round(field.caloriesPer100g * (weight *0.01), 1)}</p>
                                        </div>
                                        <div className="macro-group">
                                            <label>B:</label>
                                            <p>{round(field.proteinPer100g * (weight * 0.01), 1)}</p>
                                        </div>
                                        <div className="macro-group">
                                            <label>W:</label>
                                            <p>{round(field.carbsPer100g * (weight * 0.01), 1)}</p>
                                        </div>
                                        <div className="macro-group">
                                            <label>T:</label>
                                            <p>{round(field.fatPer100g * (weight * 0.01), 1)}</p>
                                        </div>
                                    </div>
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