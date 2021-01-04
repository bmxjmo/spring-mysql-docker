package com.algaworks.osworks.api.controller;

import com.algaworks.osworks.domain.model.Cliente;
import com.algaworks.osworks.domain.repository.ClienteRepository;
import com.algaworks.osworks.domain.service.CadastroClienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.*;

@RestController
@RequestMapping("/clientes")
public class ClienteController {

    @Autowired
    private ClienteRepository clienteRepository;

    @Autowired
    private CadastroClienteService cadastroCliente;

    @GetMapping
    public ResponseEntity<Map<String, Object>> listar(
            @RequestParam(defaultValue = "0") int pagina,
            @RequestParam(defaultValue = "3") int quantidade) {

        List<Cliente> clientes = new ArrayList<Cliente>();

        Pageable paginacao = PageRequest.of(pagina, quantidade);
        Page<Cliente> lista = clienteRepository.findAll(paginacao);

        clientes = lista.getContent();

        Map<String, Object> listaClientes = new HashMap<>();

        listaClientes.put("clientes", clientes);
        listaClientes.put("paginaAtual", lista.getNumber());
        listaClientes.put("totalQuantidade", lista.getTotalElements());
        listaClientes.put("totalPaginas", lista.getTotalPages());

        return new ResponseEntity<>(listaClientes, HttpStatus.OK);
    }

    @GetMapping("/{clienteId}")
    public ResponseEntity<Cliente> buscar(@PathVariable Long clienteId){
        Optional<Cliente> cliente = clienteRepository.findById(clienteId);

        if (cliente.isPresent()) {
            return ResponseEntity.ok(cliente.get());
        }

        return ResponseEntity.notFound().build();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Cliente adicionar(@Valid @RequestBody Cliente cliente) {
        return cadastroCliente.salvar(cliente);
    }

    @PutMapping("/{clienteId}")
    public ResponseEntity<Cliente> atualizar(@Valid @PathVariable Long clienteId,
                                             @Valid @RequestBody Cliente cliente) {
        if (!clienteRepository.existsById(clienteId)) {
            return ResponseEntity.notFound().build();
        }

        cliente.setId(clienteId);
        cliente = cadastroCliente.salvar(cliente);

        return ResponseEntity.ok(cliente);
    }

    @RequestMapping("/{clienteId}")
    public ResponseEntity<Void> remover(@PathVariable Long clienteId){

        if (!clienteRepository.existsById(clienteId)) {
            return ResponseEntity.notFound().build();
        }

        cadastroCliente.excluir(clienteId);

        return  ResponseEntity.noContent().build();
    }

}
