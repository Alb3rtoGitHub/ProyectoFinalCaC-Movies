
package controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import dao.UsuarioDAO;
import java.io.IOException;
import java.util.List;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import modelo.Usuario;

// Esta anotación mapea el Servlet a la URL "/GestionUsuariosServlet"
@WebServlet("/GestionUsuariosServlet")
public class GestionUsuariosServlet extends HttpServlet {
    
    // DAO usuarioDAO para operaciones de acceso a base de datos
    private UsuarioDAO usuarioDAO;
    // ObjectMapper para convertir objetos Java a JSON y viceversa
    private ObjectMapper objectMapper;
    
    // Constructor: se ejecuta cuando se crea el Servlet
    public GestionUsuariosServlet (){
        this.usuarioDAO = new UsuarioDAO();
        this.objectMapper = new ObjectMapper();
    }
    
// ------------------------------------------------------------------------------------------------------- //    
    // Obtener Usuarios
    
    // Manejar las peticiones GET
    @Override
    protected void doGet (HttpServletRequest request, HttpServletResponse response) throws IOException {
        // Configura la respuesta como JSON
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        
        String idParam = request.getParameter("id");
        
        if (idParam != null) {
            // Si se proporciona un id, obtener un usuario específico
            int id = Integer.parseInt(idParam);
            Usuario usuario = usuarioDAO.obtenerPorId(id);
            
            objectMapper.writeValue(response.getWriter(), usuario);
        } else {
            // Si no se proporciona un id. obtener todos los usuarios
            List<Usuario> usuarios = usuarioDAO.obtenerTodos();
            objectMapper.writeValue(response.getWriter(), usuarios);
            // Convierte la lista de usuarios en JSON y la envía como respuesta HTTP
        }
    }
    
// ------------------------------------------------------------------------------------------------------- //    
    // Actualizar Usuario
    @Override
    protected void doPut (HttpServletRequest request, HttpServletResponse response) throws IOException {
        
        // Lee el usuario del cuerpo de la petición y lo convierte en un objeto Usuario
        Usuario usuario = objectMapper.readValue(request.getReader(), Usuario.class);
        // objectMapper.readValue: Convierte el JSON recibido en un objeto Java
        // request.getReader(): Obtiene el contenido del cuerpo de la petición HTTP
        // Usuario.class: Especifica que el JSON debe convertirse en un objeto de tipo Usuario

        // Intenta modificar el usuario
        boolean exito = usuarioDAO.modificar(usuario);

        // Prepara y envía la respuesta
        // Establece el tipo de contenido de la respuesta como JSON
        response.setContentType("application/json");
        // Establece la codificación de caracteres de la respuesta como UTF-8
        response.setCharacterEncoding("UTF-8");
        // Escribe la respuesta como JSON
        response.getWriter().write("{\"exito\":" + exito + "}");
        // getWriter(): Obtiene un objeto que permite escribir datos hacia un destino
        // write(): Escribe la cadena JSON en la respuesta
        // La cadena JSON es una representación simple del éxito o fracaso de la operación {"exito": true}
    }
    
// ------------------------------------------------------------------------------------------------------- //    
    // Eliminar Usuario
    // Manejar las peticiones DELETE
    @Override
    protected void doDelete(HttpServletRequest request, HttpServletResponse response) throws IOException {
        // Obtener el id del parámetro de la URL
        int id = Integer.parseInt(request.getParameter("id"));
        
        // Intenta eliminar el usuario
        boolean exito = usuarioDAO.eliminar(id);
        
        // Prepara y envia respuesta
        // Establece el tipo de contenido de la respuesta como JSON
        response.setContentType("application/json");
        // Establece la codificación de caracteres de la respuesta como UTF-8
        response.setCharacterEncoding("UTF-8");
        // Escribe la respuesta JSON
        response.getWriter().write("{\"exito\":" + exito + "}");
    }
}
