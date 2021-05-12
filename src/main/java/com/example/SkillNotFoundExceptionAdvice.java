package com.example;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
class SkillNotFoundAdvice {

  @ResponseBody
  @ExceptionHandler(SkillNotFoundException.class)
  @ResponseStatus(HttpStatus.NOT_FOUND)
  String skillNotFoundHandler(SkillNotFoundException ex) {
    return ex.getMessage();
  }
}