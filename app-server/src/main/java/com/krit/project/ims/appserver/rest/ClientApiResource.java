package com.krit.project.ims.appserver.rest;

import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.krit.project.ims.appserver.entity.repository.ClientApiRepository;
import com.krit.project.ims.appserver.rest.vm.ProductName;

@RestController
@RequestMapping("/api")
@Transactional
public class ClientApiResource {

  private final Logger log = LoggerFactory.getLogger(ClientApiResource.class);

  private final ClientApiRepository clientApiRepository;

  public ClientApiResource(ClientApiRepository clientApiRepository) {
    this.clientApiRepository = clientApiRepository;
  }

  @GetMapping("/products/name-list")
  public List<ProductName> getAllProductName() {
    log.debug("REST request to get all ProductName");
    return clientApiRepository.findAllProductName();
  }
}
