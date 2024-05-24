def even (n : Nat) : Prop := ∃(m:Nat), m+m=n

theorem plus11 : 1+1=2 := Eq.refl _

theorem even2 : even 2 :=
  have e : 1+1=2 := plus11
  ⟨1,e⟩
