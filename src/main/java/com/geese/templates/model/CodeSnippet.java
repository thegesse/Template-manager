package com.geese.templates.model;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class CodeSnippet {
    private Integer id;
    private String code;
    private String description;
}
