package com.mitocode.controller;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

import java.net.URI;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.server.mvc.WebMvcLinkBuilder;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.mitocode.exception.ModeloNotFoundException;
import com.mitocode.model.SignosVitales;
import com.mitocode.service.ISignosVitalesService;

@RestController
@RequestMapping("/signosvitales")
public class SignosVitalesController {
	
	@Autowired
	private ISignosVitalesService service;
	
	@PreAuthorize("@authServiceImpl.tieneAcceso('listar')")
	
	@GetMapping
	public ResponseEntity<List<SignosVitales>> listar() throws Exception{
		List<SignosVitales> lista = service.listar();
		return new ResponseEntity<List<SignosVitales>>(lista, HttpStatus.OK);
	}

	@GetMapping("/hateoas/{id}")
	public EntityModel<SignosVitales> listarPorIdHateoas(@PathVariable("id") Integer id) throws Exception{
		SignosVitales obj = service.listarPorId(id);

		if(obj == null) {
			throw new ModeloNotFoundException("ID NO ENCONTRADO " + id);
		}
		
		//localhost:8080/pacientes/{id}
		EntityModel<SignosVitales> recurso = EntityModel.of(obj);
		WebMvcLinkBuilder linkTo = linkTo(methodOn(this.getClass()).listarPorId(id));
		
		recurso.add(linkTo.withRel("signosvitales-recurso"));
		
		return recurso;
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<SignosVitales> listarPorId(@PathVariable("id") Integer id) throws Exception{  //@RequestParam
		SignosVitales obj = service.listarPorId(id);		
			
		if(obj == null) {
			throw new ModeloNotFoundException("ID NO ENCONTRADO: " + id);
		}
		return new ResponseEntity<SignosVitales>(obj, HttpStatus.OK);
	}
	

	@PostMapping
	public ResponseEntity<Void> registrar(@Valid @RequestBody SignosVitales signosvitales) throws Exception{		
		SignosVitales obj = service.registrar(signosvitales);
		
		URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(obj.getIdSignosVitales()).toUri();
		
		return ResponseEntity.created(location).build();
	}
	
	@PutMapping
	public ResponseEntity<SignosVitales> modificar(@Valid @RequestBody SignosVitales signosvitales) throws Exception{
		SignosVitales obj = service.modificar(signosvitales);
		return new ResponseEntity<SignosVitales>(obj, HttpStatus.OK);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> eliminar(@PathVariable("id") Integer id) throws Exception{
		SignosVitales obj = service.listarPorId(id);
		if(obj == null) {
			throw new ModeloNotFoundException("ID NO ENCONTRADO: " + id);
		}
		service.eliminar(id);
		return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
	}

}
