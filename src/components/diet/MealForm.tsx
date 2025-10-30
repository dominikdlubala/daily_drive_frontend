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

    const { 
        register, 
        handleSubmit,
        control, 
        formState: { errors, isSubmitting }
    } = useForm<Meal>({
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

            <form onSubmit={handleSubmit(onSubmit)} className="form meal-form">
                <div ref={topRef} className="form-group">
                    {
                        initialData 
                        &&
                        <button type="button" className="btn remove-button" onClick={() => onDelete(initialData.id as number)}>Usuń posiłek</button>
                    }
                    <label  className="form-input--label">Nazwa posiłku</label>
                    <input className="form-input" id="name" {...register("name", {
                        required: { value: true, message: 'Nazwa posiłku jest wymagana' },
                        minLength: { value: 3, message: 'Nazwa posiłku musi mieć przynajmniej 3 znaki' }
                    })} />
                    {errors.name && <span className="input-validate">{errors.name.message}</span>}
                </div>
                <div className="form-group">
                    <label>Produkty</label>
                    <ProductSearch handleSelect={onProductSelect} />
                    <button type="button" onClick={handleAddProductClick} className="btn-add">
                        Dodaj własny produkt +
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
                                                {...register(`products.${index}.weight` as const, {
                                                    required: { value: true, message: 'Waga jest wymagana' },
                                                    min: { value: 0, message: 'Waga musi być większa od 0' },
                                                    max: { value: 5000, message: 'Waga nie może przekraczać 5000g' }
                                                })}
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
                {errors.products && <span className="input-validate">{errors.products.message}</span>}
                <button type="submit" className="btn-submit" disabled={isSubmitting}>{isSubmitting ? 'Zapisuję...' : 'Zapisz' }</button>
            </form>
        </>
    );
}