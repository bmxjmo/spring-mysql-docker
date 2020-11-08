package com.algaworks.osworks.api.controller;

import com.algaworks.osworks.domain.model.Cliente;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;

@RestController
public class ClienteController {
    @GetMapping("/clientes")
    public List<Cliente> listar(){

        var cliente1 = new Cliente();
        var cliente2 = new Cliente();

        cliente1.setId(1L);
        cliente1.setNome("John");
        cliente1.setEmail("john@email.com");
        cliente1.setTelefone("11 98765 4321");

        cliente2.setId(1L);
        cliente2.setNome("Paul");
        cliente2.setEmail("paul@email.com");
        cliente2.setTelefone("22 98765 4321");

        return Arrays.asList(cliente1, cliente2);

    }

}
