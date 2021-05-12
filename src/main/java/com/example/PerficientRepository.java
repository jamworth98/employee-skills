package com.example;

import org.springframework.data.jpa.repository.JpaRepository;

interface PerficientRepository extends JpaRepository<Employee, String> {

}