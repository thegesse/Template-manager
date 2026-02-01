package com.geese.templates.controller;

import com.geese.templates.model.CodeSnippet;
import com.geese.templates.services.TemplateService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/templates")
@CrossOrigin(origins ="*")
public class PageController {
    private final TemplateService templateService;

    public PageController(TemplateService taskService) {
        this.templateService = taskService;
    }
    @PostMapping
    public CodeSnippet addCode(@RequestBody CodeSnippet codeSnippet){
        return templateService.addCode(codeSnippet);
    }

    @DeleteMapping("/{id}")
    public void deleteCode(@PathVariable Integer id){
        templateService.deleteCode(id);
    }

    @GetMapping
    public List<CodeSnippet> getCode(){
        return templateService.getAllTemplates();
    }
}
