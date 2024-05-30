import Leanproject.Basic

theorem one_sides(b : ℝ) : 1 * b * 1 = b := by
  rw [myComm 1 b 1]
  rw [mul_one]
  rw [mul_one]