package com.example;

class SkillNotFoundException extends RuntimeException {

  SkillNotFoundException() {
    super("Technical skill or Perficient employee not found.");
  }
}