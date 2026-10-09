import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;

public class connector {
    public static void main(String[] args) throws Exception {
//        Class.forName("org.postgresql.Driver");


        Class.forName("com.mysql.cj.jdbc.Driver");

        try (Connection con = DriverManager.getConnection(
                "jdbc:mysql://localhost:3306/st_fs",
                "udbhavvj",
                "Udbhavvj2006"
        )) {
            Statement executor = con.createStatement();
            
            String query = "select * from student;";
            ResultSet rs = executor.executeQuery(query);
            while (rs.next()) {
                System.out.println(rs.getString("name"));
            }
            
            System.out.println("Connected!");
        }


    }
}