import { Control, Controller, FieldValues, Path } from "react-hook-form"
import Select, { MultiValue, SingleValue } from 'react-select'; 

interface InputProps<T extends FieldValues> {
  type?: string; 
  name: Path<T>; 
  control: Control<T>; 
  placeholder?: string; 
}

export const Input = <T extends FieldValues>({ control, name, placeholder, type = 'text' }: InputProps<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error }}) => (
        <>
          <input
            type={type}
            {...field}
            placeholder={placeholder}
            className="form_input"
          />
          <span className="form_error">{error?.message || ''}</span>
        </>
      )}
    />
  )
}

interface Option {
  label: string; 
  value: string | number; 
}

interface SelectProps<T extends FieldValues> {
  control: Control<T>; 
  name: Path<T>; 
  multiple?: boolean;  
  options: Option[]; 
  className?: string; 
}

export const ControlledSelect = <T extends FieldValues>({
  control,
  name,
  options,
  multiple = false,
  className
}: SelectProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        type Single = SingleValue<Option>;
        type Multi = MultiValue<Option>;

        const handleChange = (selected: Single | Multi | null) => {
          if (multiple) {
            field.onChange((selected as Multi)?.map(s => s.value) || []);
          } else {
            field.onChange((selected as Single)?.value || "");
          }
        };

        const value = multiple
          ? options.filter(opt => (field.value as any[] || []).includes(opt.value))
          : options.find(opt => opt.value === field.value) || null;

        return (
          <>
            <div className={`form_select ${className || ''}`}>
              <Select
                options={options}
                isMulti={multiple}
                onChange={handleChange}
                value={value}
              />
            </div>
            <span className="form_error">{error?.message || "\u00A0"}</span>
          </>
        );
      }}
    />
  );
};