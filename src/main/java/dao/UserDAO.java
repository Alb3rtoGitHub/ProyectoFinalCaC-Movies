
package dao;

import conexion.ConexionDB;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class UserDAO {
    public boolean validarUsuario(String email, String contrasena){
        boolean validar = false;
        
        String sql = "SELECT * FROM login WHERE email = ? AND contrasena = ?";
        
        try {
            // Obtener conexión
            Connection conexion = ConexionDB.obtenerConexion();
            
            //Preparar la consulta
            PreparedStatement consulta = conexion.prepareStatement(sql);
            
            //Completar Argumentos
            consulta.setString(1, email);
            consulta.setString(2, contrasena);
            
            //Ejecutar consulta
            ResultSet resultado = consulta.executeQuery();
            
            // Validar resultado del ResultSet
            validar = resultado.next();
            
            //Cierro procesos
            conexion.close();
            consulta.close();
            resultado.close();
            
        } catch (SQLException e) {
            e.printStackTrace();
        }
        
        return validar;      
    }
}
