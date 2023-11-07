<?php get_header(); ?>

<main class="container">
    <!-- si tiene contenido para mostrar sea TRUE -->
    <?php if(have_posts()){
        // si todavia tiene contenido para mostrar lo hara sino saldra del ciclo
        while (have_posts(  )) {
        /*esta funcion aparte de traer el contenido, va a instanciar la vuelta que de el while 
            para traer la informacion, es decir si solo mostrara una pagina va a traer el contenido una vez
            va a sumar 1 y le dira a have_posts que no hay contenido para mostrar, 
            devolvera false y saldra del while */
         the_post(  ); ?>

    <!-- esta funcion va a retornarnos el titulo de la pagina y lo imprimira -->
    <h1 class="my-3"><?php the_title( );?></h1>

    <!-- the content retornara y imprimira el contenido de gutenberg en nuestra pagina  -->
    <?php the_content(); ?>
    <?php }
    }?>
</main>

<?php get_footer(); ?>