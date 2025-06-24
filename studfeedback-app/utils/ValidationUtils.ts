// // utils/ValidationUtils.ts
// export interface ValidationResult {
//   isValid: boolean;
//   error?: string;
// }

// export class ValidationUtils {
//   // Name Validation
//   static validateName(name: string): ValidationResult {
//     if (!name || !name.trim()) {
//       return { isValid: false, error: 'Name is required' };
//     }
    
//     const trimmedName = name.trim();
    
//     if (trimmedName.length < 2) {
//       return { isValid: false, error: 'Name must be at least 2 characters long' };
//     }
    
//     if (trimmedName.length > 50) {
//       return { isValid: false, error: 'Name cannot exceed 50 characters' };
//     }
    
//     // Check for valid characters (letters, spaces, hyphens, apostrophes)
//     const nameRegex = /^[a-zA-Z\s\-'\.]+$/;
//     if (!nameRegex.test(trimmedName)) {
//       return { isValid: false, error: 'Name can only contain letters, spaces, hyphens, and apostrophes' };
//     }
    
//     // Check for consecutive spaces
//     if (/\s{2,}/.test(trimmedName)) {
//       return { isValid: false, error: 'Name cannot contain consecutive spaces' };
//     }
    
//     return { isValid: true };
//   }

//   // Course Validation
//   static validateCourse(course: string): ValidationResult {
//     if (!course || !course.trim()) {
//       return { isValid: false, error: 'Course is required' };
//     }
    
//     const trimmedCourse = course.trim();
    
//     if (trimmedCourse.length < 2) {
//       return { isValid: false, error: 'Course must be at least 2 characters long' };
//     }
    
//     if (trimmedCourse.length > 100) {
//       return { isValid: false, error: 'Course cannot exceed 100 characters' };
//     }
    
//     // Allow letters, numbers, spaces, common punctuation
//     const courseRegex = /^[a-zA-Z0-9\s\-&().,]+$/;
//     if (!courseRegex.test(trimmedCourse)) {
//       return { isValid: false, error: 'Course contains invalid characters' };
//     }
    
//     return { isValid: true };
//   }

//   // Roll number Validation
//   static validateRollNumber(roll: string): ValidationResult {
//     if (!roll || !roll.trim()) {
//       return { isValid: false, error: 'Roll number is required' };
//     }
    
//     const trimmedRoll = roll.trim();
    
//     if (trimmedRoll.length < 3) {
//       return { isValid: false, error: 'Roll number must be at least 3 characters long' };
//     }
    
//     if (trimmedRoll.length > 20) {
//       return { isValid: false, error: 'Roll number cannot exceed 20 characters' };
//     }
    
//     // Allow alphanumeric characters, hyphens, and underscores
//     const rollRegex = /^[a-zA-Z0-9\-_]+$/;
//     if (!rollRegex.test(trimmedRoll)) {
//       return { isValid: false, error: 'Roll number can only contain letters, numbers, hyphens, and underscores' };
//     }
    
//     return { isValid: true };
//   }

//   // Check for duplicate roll number
//   static validateUniqueRollNumber(roll: string, existingStudents: any[], currentStudentId?: string): ValidationResult {
//     const trimmedRoll = roll.trim().toLowerCase();
//     const duplicate = existingStudents.find(student => 
//       student.roll.toLowerCase() === trimmedRoll && student.id !== currentStudentId
//     );
    
//     if (duplicate) {
//       return { isValid: false, error: 'Roll number already exists' };
//     }
    
//     return { isValid: true };
//   }

//   // Feedback validation (optional field)
//   static validateFeedback(feedback: string): ValidationResult {
//     if (!feedback || !feedback.trim()) {
//       return { isValid: true }; // Feedback is optional
//     }
    
//     const trimmedFeedback = feedback.trim();
    
//     if (trimmedFeedback.length > 500) {
//       return { isValid: false, error: 'Feedback cannot exceed 500 characters' };
//     }
    
//     return { isValid: true };
//   }

//   // Rating validation
//   static validateRating(rating: string | number): ValidationResult {
//     if (!rating && rating !== 0) {
//       return { isValid: true }; // Rating is optional, default to 0
//     }
    
//     const numRating = typeof rating === 'string' ? parseFloat(rating) : rating;
    
//     if (isNaN(numRating)) {
//       return { isValid: false, error: 'Rating must be a valid number' };
//     }
    
//     if (numRating < 0) {
//       return { isValid: false, error: 'Rating cannot be negative' };
//     }
    
//     if (numRating > 5) {
//       return { isValid: false, error: 'Rating cannot exceed 5' };
//     }
    
//     // Check for reasonable decimal places (max 1 decimal place)
//     if (numRating % 0.5 !== 0) {
//       return { isValid: false, error: 'Rating must be in increments of 0.5 (e.g., 3.5, 4.0)' };
//     }
    
//     return { isValid: true };
//   }

//   // Validate entire student object
//   static validateStudent(student: any, existingStudents: any[], isUpdate: boolean = false): ValidationResult {
//     // Name validation
//     const nameValidation = this.validateName(student.name);
//     if (!nameValidation.isValid) {
//       return nameValidation;
//     }

//     // Course validation
//     const courseValidation = this.validateCourse(student.course);
//     if (!courseValidation.isValid) {
//       return courseValidation;
//     }

//     // Roll number validation
//     const rollValidation = this.validateRollNumber(student.roll);
//     if (!rollValidation.isValid) {
//       return rollValidation;
//     }

//     // Unique roll number validation
//     const uniqueRollValidation = this.validateUniqueRollNumber(
//       student.roll, 
//       existingStudents, 
//       isUpdate ? student.id : undefined
//     );
//     if (!uniqueRollValidation.isValid) {
//       return uniqueRollValidation;
//     }

//     // Feedback validation
//     const feedbackValidation = this.validateFeedback(student.feedback);
//     if (!feedbackValidation.isValid) {
//       return feedbackValidation;
//     }

//     // Rating validation
//     const ratingValidation = this.validateRating(student.rating);
//     if (!ratingValidation.isValid) {
//       return ratingValidation;
//     }

//     return { isValid: true };
//   }

//   // Sanitize input (trim and basic cleanup)
//   static sanitizeInput(input: string): string {
//     return input?.trim().replace(/\s+/g, ' ') || '';
//   }

//   // Generate safe ID
//   static generateId(): string {
//     return Date.now().toString() + Math.random().toString(36).substr(2, 9);
//   }
// }