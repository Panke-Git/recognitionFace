package com.itboyst.facedemo.mapper;

import com.itboyst.facedemo.dto.Ztraining_facility;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface Ztraining_facilityMapper {
    public Ztraining_facility findtrain_fac(String zstudentPCIP);

    public List<Ztraining_facility> findfactibyrid(String zlocation);
}
