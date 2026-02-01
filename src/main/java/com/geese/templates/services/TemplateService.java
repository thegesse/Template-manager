package com.geese.templates.services;

import com.geese.templates.model.CodeSnippet;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class TemplateService {
    private final List<CodeSnippet> code = new ArrayList<>();
    private int currentId = 0;

    public CodeSnippet addCode(CodeSnippet codeSnippet) {
        codeSnippet.setId(currentId++);
        code.add(codeSnippet);
        return codeSnippet;
    }

    public void deleteCode(Integer id) {
        code.removeIf(code-> code.getId().equals(id));
    }

    public List<CodeSnippet> getAllTemplates() {
        return new ArrayList<>(code);
    }
}
