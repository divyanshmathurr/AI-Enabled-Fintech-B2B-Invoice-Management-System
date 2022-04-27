package com.highradius;

import java.sql.Connection;
//import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.Types;
//import java.sql.Date;

public class Add {

    public int registerEmployee(Pojo1 pj) throws ClassNotFoundException {
    	System.out.println("Hello");
    	String INSERT_USERS_SQL = "Insert into winter_internship(`business_code`,`cust_number`,`clear_date`,`buisness_year`,`doc_id`,`posting_date`,`document_create_date`,`due_in_date`,`baseline_create_date`,`cust_payment_terms`,`invoice_currency`,`document_type`,`posting_id`,`invoice_id`,`total_open_amount`,`sl_no`,`is_deleted`)" + "values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
        int result = 0;


        try (
        		Connection con = DBConnection.createConnect(); 
            // Step 2:Create a statement using connection object
            PreparedStatement ps = con.prepareStatement(INSERT_USERS_SQL)) {
        	ps.setString(1, pj.getBusiness_code());
            ps.setString(2, pj.getCust_number());
            ps.setString(3, pj.getClear_date());
            ps.setString(4, pj.getBuisness_year());
            ps.setString(5, pj.getDoc_id());
            ps.setString(6, pj.getPosting_date());
            ps.setString(7, pj.getDocument_create_date());
            ps.setString(8, pj.getDue_in_date());
            ps.setString(9, pj.getBaseline_create_date());
            ps.setString(10, pj.getCust_payment_terms());
            ps.setString(11, pj.getInvoice_currency());
            ps.setString(12, pj.getDocument_type());
            ps.setString(13, pj.getPosting_id());
            ps.setString(14, pj.getInvoice_id());
            ps.setString(15, pj.getTotal_open_amount());
            ps.setNull(16, Types.NULL);
            ps.setInt(17, 0);

            System.out.println(ps);
            // Step 3: Execute the query or update query
            result = ps.executeUpdate();
           
        } catch (SQLException e) {
            // process sql exception
            printSQLException(e);
        }
        return result;
    }

    private static void printSQLException(SQLException ex) {
        for (Throwable e: ex) {
            if (e instanceof SQLException) {
                e.printStackTrace(System.err);
                System.err.println("SQLState: " + ((SQLException) e).getSQLState());
                System.err.println("Error Code: " + ((SQLException) e).getErrorCode());
                System.err.println("Message: " + e.getMessage());
                Throwable t = ex.getCause();
                while (t != null) {
                    System.out.println("Cause: " + t);
                    t = t.getCause();
                }
            }
        }
    }
}