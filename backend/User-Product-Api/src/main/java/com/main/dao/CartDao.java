package com.main.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.main.entity.Cart;

@Repository
public interface CartDao extends JpaRepository<Cart, Integer> {

}
