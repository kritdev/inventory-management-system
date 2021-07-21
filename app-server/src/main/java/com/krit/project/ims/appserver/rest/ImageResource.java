package com.krit.project.ims.appserver.rest;


import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.krit.project.ims.appserver.entity.Image;
import com.krit.project.ims.appserver.entity.repository.ImageRepository;
import com.krit.project.ims.appserver.rest.errors.BadRequestAlertException;

@RestController
@RequestMapping("/api")
@Transactional
public class ImageResource {

  private final Logger log = LoggerFactory.getLogger(ImageResource.class);

  private static final String ENTITY_NAME = "image";

  private final ImageRepository imageRepository;

  public ImageResource(ImageRepository imageRepository) {
    this.imageRepository = imageRepository;
  }

  @PostMapping("/images")
  public ResponseEntity<Image> createImage(@Valid @RequestBody Image image)
      throws URISyntaxException {
    log.debug("REST request to save Image : {}", image);
    if (image.getId() != null) {
      throw new BadRequestAlertException("A new image cannot already have an ID", ENTITY_NAME,
          "idexists");
    }
    Image result = imageRepository.save(image);
    return ResponseEntity.created(new URI("/api/images/" + result.getId())).body(result);
  }

  @PutMapping("/images/{id}")
  public ResponseEntity<Image> updateImage(
      @PathVariable(value = "id", required = false) final Long id, @Valid @RequestBody Image image)
      throws URISyntaxException {
    log.debug("REST request to update Image : {}, {}", id, image);
    if (image.getId() == null) {
      throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
    }
    if (!Objects.equals(id, image.getId())) {
      throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
    }

    if (!imageRepository.existsById(id)) {
      throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
    }

    Image result = imageRepository.save(image);
    return ResponseEntity.ok().body(result);
  }

  @PatchMapping(value = "/images/{id}", consumes = "application/merge-patch+json")
  public ResponseEntity<Image> partialUpdateImage(
      @PathVariable(value = "id", required = false) final Long id,
      @NotNull @RequestBody Image image) throws URISyntaxException {
    log.debug("REST request to partial update Image partially : {}, {}", id, image);
    if (image.getId() == null) {
      throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
    }
    if (!Objects.equals(id, image.getId())) {
      throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
    }

    if (!imageRepository.existsById(id)) {
      throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
    }

    Optional<Image> result = imageRepository.findById(image.getId()).map(existingImage -> {
      if (image.getImageData() != null) {
        existingImage.setImageData(image.getImageData());
      }
      if (image.getImageDataContentType() != null) {
        existingImage.setImageDataContentType(image.getImageDataContentType());
      }
      if (image.getDefaultImage() != null) {
        existingImage.setDefaultImage(image.getDefaultImage());
      }

      return existingImage;
    }).map(imageRepository::save);

    return AppResponseUtil.wrapOrNotFound(result, null);
  }

  @GetMapping("/images")
  public List<Image> getAllImages() {
    log.debug("REST request to get all Images");
    return imageRepository.findAll();
  }

  @GetMapping("/images/{id}")
  public ResponseEntity<Image> getImage(@PathVariable Long id) {
    log.debug("REST request to get Image : {}", id);
    Optional<Image> image = imageRepository.findById(id);
    return AppResponseUtil.wrapOrNotFound(image);
  }

  @DeleteMapping("/images/{id}")
  public ResponseEntity<Void> deleteImage(@PathVariable Long id) {
    log.debug("REST request to delete Image : {}", id);
    imageRepository.deleteById(id);
    return ResponseEntity.noContent().build();
  }
}
