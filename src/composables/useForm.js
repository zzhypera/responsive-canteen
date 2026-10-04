import { reactive, ref } from 'vue'

// Reusable form handling.
//   initial:  starting values, e.g. { name: '', price: 0 }
//   rules:    { field: [value => true | 'error message', ...] }
//   onSubmit: called with the values only when every rule passes
export function useForm({ initial, rules = {}, onSubmit }) {
  const values = reactive({ ...initial })
  const errors = reactive({})
  const submitError = ref('')
  const submitting = ref(false)

  function validateField(field) {
    for (const rule of rules[field] || []) {
      const result = rule(values[field], values)
      if (result !== true) {
        errors[field] = result
        return false
      }
    }
    delete errors[field]
    return true
  }

  function validate() {
    // run every rule (no short-circuit) so all errors show at once
    return Object.keys(rules).map(validateField).every(Boolean)
  }

  async function handleSubmit() {
    submitError.value = ''
    if (!validate()) return
    submitting.value = true
    try {
      await onSubmit({ ...values })
    } catch (err) {
      submitError.value = err.message || 'Something went wrong.'
    } finally {
      submitting.value = false
    }
  }

  function reset() {
    Object.assign(values, initial)
    Object.keys(errors).forEach(k => delete errors[k])
    submitError.value = ''
  }

  return { values, errors, submitError, submitting, validateField, validate, handleSubmit, reset }
}

// Small ready-made rules
export const required = (msg = 'This field is required.') => v =>
  (typeof v === 'string' ? v.trim() !== '' : v !== null && v !== undefined && v !== '') || msg
export const minLength = (n, msg) => v => String(v ?? '').length >= n || msg || `Must be at least ${n} characters.`
export const matches = (regex, msg) => v => regex.test(String(v ?? '')) || msg
export const minValue = (n, msg) => v => Number(v) >= n || msg || `Must be at least ${n}.`
