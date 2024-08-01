
package conexion;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class ConexionDB {
    
    private static final String url = "jdbc:mysql://localhost:3306/cac_movies";
    private static final String user = "root";
    private static final String password = "";
    
    public static Connection obtenerConexion() throws SQLException {
        try{
            // Cargar el driver
            Class.forName("com.mysql.cj.jdbc.Driver");
        } catch (ClassNotFoundException e){
            throw new SQLException("No se encontró del Driver JDBC", e);
        }
        return DriverManager.getConnection(url, user, password);
    }

    // Prueba de Conexión
//    public static void main(String[] args) {
//        try {
//            Connection con = ConexionDB.obtenerConexion();
//            if (con != null) {
//                System.out.println("Conexión Exitosa");
//            }
//        } catch (Exception e) {
//            System.out.println(e.getMessage());
//        }
//    }
}
