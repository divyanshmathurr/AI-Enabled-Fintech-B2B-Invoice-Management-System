package com.highradius;

import java.io.IOException;
import java.sql.Connection;
//import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

@WebServlet("/Fetcher")
public class Fetch_1 extends HttpServlet {
 /**
  * 
  */
 private static final long serialVersionUID = 1L;

    /**
     * @see HttpServlet#HttpServlet()
     */
    public Fetch_1() {
        super();
        // TODO Auto-generated constructor stub
    }

 /**
  * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
  */
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
  // TODO Auto-generated method stub
  //response.getWriter().append("Served at: ").append(request.getContextPath());
  Connection conn=null;
  Statement stmt = null;
  ArrayList<Pojo1> ALLCustomer = new ArrayList<>();
  try{
	  conn = DBConnection.createConnect();
   stmt = conn.createStatement();
   String sql;

   sql = "SELECT * from winter_internship where is_deleted<>1 ";

   
   ResultSet rs = stmt.executeQuery(sql);

   while(rs.next()){
    Pojo1 s = new Pojo1();
    s.setSl_no(rs.getInt("sl_no"));
    s.setBusiness_code(rs.getString("business_code"));
    s.setCust_number(rs.getString("cust_number"));
    s.setClear_date(rs.getString("clear_date"));
    s.setBuisness_year(rs.getString("buisness_year"));
    s.setDoc_id(rs.getString("doc_id"));
    s.setPosting_date(rs.getString("posting_date"));
    s.setDocument_create_date(rs.getString("document_create_date"));
    s.setDue_in_date(rs.getString("due_in_date"));
    s.setInvoice_currency(rs.getString("invoice_currency"));
    s.setDocument_type(rs.getString("document_type"));
    s.setPosting_id(rs.getString("posting_id"));
    s.setTotal_open_amount(rs.getString("total_open_amount"));
    s.setBaseline_create_date(rs.getString("baseline_create_date"));
    s.setCust_payment_terms(rs.getString("cust_payment_terms"));
    s.setInvoice_id(rs.getString("invoice_id"));
    if(rs.getString("aging_bucket")!=null)
    s.setAging_bucket(rs.getString("aging_bucket"));
    else

        s.setAging_bucket("N/A");
    ALLCustomer.add(s);
    
   }
   Gson gson = new GsonBuilder().setPrettyPrinting().create();
   String json = gson.toJson(ALLCustomer);
   response.setContentType("application/json");
   response.setHeader("Access-Control-Allow-Origin", "*");
   response.setCharacterEncoding("UTF-8");
   try {
    response.getWriter().write(json);
   }
   catch(IOException e)
   {
    e.printStackTrace();
   }

   //Closing all the connections
   rs.close();
   stmt.close();
   conn.close();
   }catch(SQLException se){
   //Handle errors for JDBC
    se.printStackTrace();
   }catch(Exception e){
   //Handle errors for Class.forName
    e.printStackTrace();
   }finally{
    //finally block used to close resources
    try{
    if(stmt!=null)
    stmt.close();
    }catch(SQLException se2){
    }
    try{
     if(conn!=null)
      conn.close();
    }catch(SQLException se){
     se.printStackTrace();
    }
   }
  }

  /**
   * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
   */
  protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
   // TODO Auto-generated method stub
   doGet(request, response);
  }
}