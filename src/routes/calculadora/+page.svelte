
<script>
 
    let display = $state('')
    function press (C){
        display+=C;
    }
    
    function calc(){
        display = eval(display);
    }
    function clear(){
    display=  ' ';
    }
    function remove(){
        display= display.slice(display.length)
    }
    
    </script>
    
    <div class="text-center mt-3">
    <input type="text" class="form-control form-control-lg" readonly bind:value={display} >
    <table class="table table-sm table-borderless">
        <tbody>
            <tr>
                <td><button type="button" class="btn btn-danger w-100" style="background-color:  	#ca1444; border-color:	#ca1444; height:80px" onclick={()=>clear('C')}>C</button></td>
                <td><button type="button" class="btn btn-primary w-100"style="background-color:  	#ca1444; border-color:	#ca1444; height:80px" onclick={()=>press('(')}>(</button></td>
                <td><button type="button" class="btn btn-primary w-100" style="background-color:  	#ca1444; border-color:	#ca1444; height:80px" onclick={()=>press(')')}>)</button></td>
                <td><button type="button" class="btn btn-info w-100" style="background-color:  	#1E90FF; border-color:	#1E90FF; height:80px" onclick={()=>press('/')}>/</button></td>
            </tr>
            <tr>
                <td><button type="button" class="btn btn-primary w-100" style="background-color:  	#C0C0C0; border-color:	#C0C0C0; height:80px" onclick={()=>press('7')}>7</button></td>
                <td><button type="button" class="btn btn-primary w-100" style="background-color:  	#C0C0C0; border-color:	#C0C0C0; height:80px" onclick={()=>press('8')}>8</button></td>
                <td><button type="button" class="btn btn-primary w-100" style="background-color:  	#C0C0C0; border-color:	#C0C0C0; height:80px" onclick={()=>press('9')} >9</button></td>
                <td><button type="button" class="btn btn-info w-100" style="background-color:  	#1E90FF; border-color:	#1E90FF; height:80px" onclick={()=>press('*')}> x </button></td>
            </tr>
            <tr>
                <td><button type="button" class="btn btn-primary w-100" style="background-color:  	#C0C0C0; border-color:	#C0C0C0; height:80px" onclick={()=>press('4')}>4</button></td>
                <td><button type="button" class="btn btn-primary w-100" style="background-color:  	#C0C0C0; border-color:	#C0C0C0; height:80px" onclick={()=>press('5')}>5</button></td>
                <td><button type="button" class="btn btn-primary w-100" style="background-color:  	#C0C0C0; border-color:	#C0C0C0; height:80px" onclick={()=>press('6')}>6</button></td>
                <td><button type="button" class="btn btn-info w-100" style="background-color:  	#1E90FF; border-color:	##1E90FF; height:80px" onclick={()=>press('-')}>-</button></td>
            </tr>
            <tr>
                <td><button type="button" class="btn btn-primary w-100" style="background-color:  	#C0C0C0; border-color:	#C0C0C0; height:80px" onclick={()=>press('1')}>1</button></td>
                <td><button type="button" class="btn btn-primary w-100" style="background-color:  	#C0C0C0; border-color:	#C0C0C0; height:80px" onclick={()=>press('2')}>2</button></td>
                <td><button type="button" class="btn btn-primary w-100" style="background-color:  	#C0C0C0; border-color:	#C0C0C0; height:80px" onclick={()=>press('3')}>3</button></td>
                <td rowspan="2" style="height: 0px"><button type="button" class="btn btn-info w-100 h-100" style="background-color:  	#1E90FF; border-color:	#1E90FF0; height:80px" onclick={()=>press('+')}>+</button></td>
            </tr>
            <tr>
                <td><button type="button" class="btn btn-primary w-100" style="background-color:  	#C0C0C0; border-color:	#C0C0C0; height:80px" onclick={()=>press('0')}>0</button></td>
                <td><button type="button" class="btn btn-info w-100" style="background-color:  #1E90FF; border-color:	#1E90FF; height:80px" onclick={()=>press('.')}>.</button></td>
                <td><button type="button" class="btn btn-info w-100" style="background-color:  	#1E90FF; border-color:	#1E90FF; height:80px" onclick={()=>calc('=')}>=</button></td>
            </tr>
        </tbody>
    </table>
    </div>
    