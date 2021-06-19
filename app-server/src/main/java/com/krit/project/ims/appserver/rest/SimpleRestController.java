package com.krit.project.ims.appserver.rest;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SimpleRestController {

  @RequestMapping("/api/simple")
  String getSampleMessage() {
    return "{\"message\":\"Hello\"}";
  }

}
