using MoviesApi.Entities;
using System.ComponentModel.DataAnnotations;

namespace MoviesApi.Validations
{
    public class FirstLetterUppercaseAttribute: ValidationAttribute
    {
        protected override ValidationResult IsValid(object? value, ValidationContext validationContext)
        {
            //we override the validation method
            //two parameter: value brings us the value of the 
            //property where the attribute has been placed
            //validationContext brings us information
            //about the context in which the validation is running
            //For example, we can bring the object which is
            //being validated
            //which means we can bring every
            //single value of
            //the model through the validation context


            //the disadvantage of validationContext is that it forces us to
            //apply the validation methods to a single
            //class, as, as we can see, we have to 
            //instance the object
            //var genre = (Genre)validationContext.ObjectInstance;
            
            if(value == null || string.IsNullOrEmpty(value.ToString()))
            {
                return ValidationResult.Success!;
            }

            var firstLetter = value.ToString()![0].ToString();
            
            if(firstLetter!=firstLetter.ToUpper())
            {
                return new ValidationResult("First letter should be uppercase");
            }


            return ValidationResult.Success!;
            //return base.IsValid(value, validationContext);
        }
    }
}
