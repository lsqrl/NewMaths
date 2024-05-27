import Mathlib.Data.Real.Basic

theorem myComm(a b c : ℝ) : a * b * c = b * (a * c) := by
  rw [mul_comm a b]
  rw [mul_assoc b a c]
