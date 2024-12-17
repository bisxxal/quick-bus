
export const handelError = (error: any , route:string) => {
    if (error instanceof Error) {
        // console.log(`Error ${route} ==>> ${error.message}`);
        // console.log('Stack trace:', error.stack);
      } else {
        // console.log('Unexpected error:', error);   
      } 
}