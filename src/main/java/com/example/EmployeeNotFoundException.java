package com.example;

class EmployeeNotFoundException extends RuntimeException {

  EmployeeNotFoundException() {
    super("Perficient employee not found.");
  }
}