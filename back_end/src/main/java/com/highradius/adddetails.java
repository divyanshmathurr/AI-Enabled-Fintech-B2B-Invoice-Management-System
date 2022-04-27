package com.highradius;
import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
/**
 * Servlet implementation class Add
 */
@WebServlet("/AddDetail")
public class adddetails extends HttpServlet {
	private static final long serialVersionUID = 1L;
	 private Add add=new Add();
    /**
     * @see HttpServlet#HttpServlet()
     */
    public adddetails() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		System.out.println(request.getReader());  

        JsonObject data = new Gson().fromJson(request.getReader(), JsonObject.class);

        System.out.println(data);

        //int sl_no = data.get("sl_no").getAsInt();
        String business_code = data.get("business_code").getAsString();
        String custnum = data.get("cust_number").getAsString();
        String clear_date = data.get("clear_date").getAsString();
        String buisness_year = data.get("buisness_year").getAsString();
        String doc_id = data.get("doc_id").getAsString();
        String posting_date = data.get("posting_date").getAsString();
        System.out.println(posting_date);
        String document_create_date = data.get("document_create_date").getAsString();

        String due_in_date = data.get("due_in_date").getAsString();
        String baseline_create_date = data.get("baseline_create_date").getAsString();
        String cust_payment_terms = data.get("cust_payment_terms").getAsString();
        String invoice_currency = data.get("invoice_currency").getAsString();
        String document_type = data.get("document_type").getAsString();
        String posting_id = data.get("posting_id").getAsString();
        String invoice_id = data.get("invoice_id").getAsString();
        String total_open_amount = data.get("total_open_amount").getAsString();

        Pojo1 pj = new Pojo1();
        pj.setBusiness_code(business_code);
        pj.setCust_number(custnum);
        pj.setClear_date(clear_date);
        pj.setBuisness_year(buisness_year);
        pj.setDoc_id(doc_id);
        pj.setPosting_date(posting_date);
        pj.setDocument_create_date(document_create_date);

        pj.setDue_in_date(due_in_date);
        pj.setBaseline_create_date(baseline_create_date);
        pj.setCust_payment_terms(cust_payment_terms);
        pj.setInvoice_currency(invoice_currency);
        pj.setDocument_type(document_type);
        pj.setPosting_id(posting_id);
        pj.setInvoice_id(invoice_id);
        pj.setTotal_open_amount(total_open_amount);

        try {
            add.registerEmployee(pj);      //fetching the data and sending it to Add servlet through it's function
            System.out.println("Added succesfull");
        } catch (Exception e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        response.getWriter().write("Hello");
    }

	
 		

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
		 	
	}
}