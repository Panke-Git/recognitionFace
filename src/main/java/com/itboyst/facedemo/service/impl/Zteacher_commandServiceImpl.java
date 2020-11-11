package com.itboyst.facedemo.service.impl;


import com.itboyst.facedemo.dto.Zteacher_command;
import com.itboyst.facedemo.mapper.Zteacher_commandMapper;
import com.itboyst.facedemo.service.Zteacher_commandService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class Zteacher_commandServiceImpl implements Zteacher_commandService {
    @Autowired
    Zteacher_commandMapper zteacher_commandMapper;

    @Override
    public List<Zteacher_command> selectcommand(String ztrainingroomID){

       return zteacher_commandMapper.findcommand(ztrainingroomID);
    }
}