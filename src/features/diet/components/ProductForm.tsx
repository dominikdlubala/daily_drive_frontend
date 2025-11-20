import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Product } from '../../../types';

interface ProductFormProps {
    onSubmit: (data: Product) => void;
    onCancel: () => void; 
}

export default function ProductForm({ onSubmit, onCancel }: ProductFormProps) {
    const { register, handleSubmit, formState: { errors } } = useForm<Product>();

    const onFormSubmit: SubmitHandler<Product> = data => {
        onSubmit(data);
    };

    return (
        <form onSubmit={handleSubmit(onFormSubmit)} className="product-form">
            <div className="form-group">
                <label htmlFor="name">Nazwa produktu</label>
                <input 
                    className="form-input"
                    id="name" 
                    {...register("name", { required: "Nazwa produktu jest wymagana" })} 
                />
                {errors.name && <span className="input-validate">{errors.name.message}</span>}
            </div>
            <div className="form-group">
                <label htmlFor="caloriesPer100g">Kalorie na 100g</label>
                <input 
                    className="form-input"
                    type="number" 
                    id="caloriesPer100g" 
                    {...register("caloriesPer100g", { required: "Kalorie są wymagane", min: 0 })} 
                    step="0.01"
                />
                {errors.caloriesPer100g && <span className="input-validate">{errors.caloriesPer100g.message}</span>}
            </div>
            <div className="form-group">
                <label htmlFor="proteinPer100g">Białko na 100g (g)</label>
                <input 
                    className="form-input"
                    type="number" 
                    id="proteinPer100g" 
                    {...register("proteinPer100g", { required: "Białko jest wymagane", min: 0 })} 
                    step="0.01"
                />
                {errors.proteinPer100g && <span className="input-validate">{errors.proteinPer100g.message}</span>}
            </div>
            <div className="form-group">
                <label htmlFor="carbsPer100g">Węglowodany na 100g (g)</label>
                <input 
                    className="form-input"
                    type="number" 
                    id="carbsPer100g" 
                    {...register("carbsPer100g", { required: "Węglowodany są wymagane", min: 0 })} 
                    step="0.01"
                />
                {errors.carbsPer100g && <span className="input-validate">{errors.carbsPer100g.message}</span>}
            </div>
            <div className="form-group">
                <label htmlFor="fatPer100g">Tłuszcz na 100g (g)</label>
                <input 
                    className="form-input"
                    type="number" 
                    id="fatPer100g" 
                    {...register("fatPer100g", { required: "Tłuszcz jest wymagany", min: 0 })} 
                    step="0.01"
                />
                {errors.fatPer100g && <span className="input-validate">{errors.fatPer100g.message}</span>}
            </div>
            <div className="form-group">
                <button type="submit" className="btn-submit">Dodaj produkt</button>
            </div>
            <div className="form-group">
                <button type="button" className="btn-cancel" onClick={onCancel}>Anuluj</button>
            </div>
            
        </form>
    );
};
