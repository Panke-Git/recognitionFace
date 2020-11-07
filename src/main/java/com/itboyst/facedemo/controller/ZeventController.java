package com.itboyst.facedemo.controller;

import com.itboyst.facedemo.dto.Zstudent;
import com.itboyst.facedemo.dto.Zstudent_event;
import com.itboyst.facedemo.service.Zstudent_eventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpSession;
import java.sql.Timestamp;
import java.util.UUID;

@Controller
public class ZeventController {
    @Autowired
    Zstudent_eventService zstudent_eventService;

    @RequestMapping("/insertevent")
    @ResponseBody
    public int insertevent(HttpSession session,String ztype){
        Zstudent_event zstudent_event =new Zstudent_event();

        String uuid = UUID.randomUUID().toString().replaceAll("-","");
        zstudent_event.setZid(uuid);

        Zstudent zstudent=(Zstudent)session.getAttribute("zstudent") ;
        String zstudentid=zstudent.getZid();
        zstudent_event.setZstudentID(zstudentid);

        zstudent_event.setZstatus("申请中");
        zstudent_event.setZtype(ztype);

        Timestamp timestamp=new Timestamp(System.currentTimeMillis());
        zstudent_event.setZapplicationtime(timestamp);


        return zstudent_eventService.insertevent(zstudent_event);
    }

}