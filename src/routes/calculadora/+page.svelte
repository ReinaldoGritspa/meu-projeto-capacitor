<script>
    let display = $state('');

    function press(c){
        display+= c;
    }

    function tirar(c){
        display = display.slice(0, -1);
    }

    function calc(){
        try {
            display = eval(display.replaceAll('x', '*'));
        } catch (error) {''
            display = 'Error';
        }
    }

    function clear(){
        display = '';
    }
</script>

<div claleixolindoss="text-center mt-3">
<input type="text" class="form-control form-control-lg"  readonly bind:value={display}>
<table class="table table-sm table-borderless">
    <tbody>
        <tr>
            <td><button type="button" class="btn btn-danger w-100" style="background-color: #ca1444; border-color: #ca1444; height: 80px" onclick={()=>clear()}>C</button></td>
            <td><button type="button" class="btn btn-primary w-100" style="background-color: #ca1444; border-color: #ca1444; height: 80px" onclick={()=>press('(')}>&lpar;</button></td>
            <td><button type="button" class="btn btn-primary w-100" style="background-color: #ca1444; border-color: #ca1444; height: 80px" onclick={()=>press(')')}>&rpar;</button></td>
            <td><button type="button" class="btn btn-info w-100" style="background-color: #fcae11; border-color: #fcae11; height: 80px" onclick={()=>press('/')}>/</button></td>
        </tr>
        <tr>
            <td><button type="button" class="btn btn-primary w-100" style="background-color: #142738; border-color: #142738; height: 80px" onclick={()=>press(7)}>7</button></td>
            <td><button type="button" class="btn btn-primary w-100" style="background-color: #142738; border-color: #142738; height: 80px" onclick={()=>press(8)}>8</button></td>
            <td><button type="button" class="btn btn-primary w-100" style="background-color: #142738; border-color: #142738; height: 80px" onclick={()=>press(9)}>9</button></td>
            <td><button type="button" class="btn btn-info w-100" style="background-color: #fcae11; border-color: #fcae11; height: 80px" onclick={()=>press('x')}>X</button></td>
        </tr>
        <tr>
            <td><button type="button" class="btn btn-primary w-100" style="background-color: #142738; border-color: #142738; height: 80px" onclick={()=>press(4)}>4</button></td>
            <td><button type="button" class="btn btn-primary w-100" style="background-color: #142738; border-color: #142738; height: 80px" onclick={()=>press(5)}>5</button></td>
            <td><button type="button" class="btn btn-primary w-100" style="background-color: #142738; border-color: #142738; height: 80px" onclick={()=>press(6)}>6</button></td>
            <td><button type="button" class="btn btn-info w-100" style="background-color: #fcae11; border-color: #fcae11; height: 80px" onclick={()=>press('-')}>-</button></td>
        </tr>
        <tr>
            <td><button type="button" class="btn btn-primary w-100" style="background-color: #142738; border-color: #142738; height: 80px" onclick={()=>press(1)}>1</button></td>
            <td><button type="button" class="btn btn-primary w-100" style="background-color: #142738; border-color: #142738; height: 80px" onclick={()=>press(2)}>2</button></td>
            <td><button type="button" class="btn btn-primary w-100" style="background-color: #142738; border-color: #142738; height: 80px" onclick={()=>press(3)}>3</button></td>
            <td rowspan="2" style="height: 0px"><button type="button" class="btn btn-info w-100 h-100" style="background-color: #fcae11; border-color: #fcae11"onclick={()=>press('+')} >+</button></td>
            <td><button type="button" class="btn btn-info w-100" style="background-color: #fcae11; border-color: #fcae11; height: 80px" onclick={()=>press('Math.sqrt()')}>√</button></td>
        </tr>
        <tr>
            <td><button type="button" class="btn btn-primary w-100" style="background-color: #142738; border-color: #142738; height: 80px"onclick={()=>press(0)} >0</button></td>
            <td><button type="button" class="btn btn-info w-100" style="background-color: #142738; border-color: #142738; height: 80px; color: white" onclick={()=>press('.')}>.</button></td>
            <td><button type="button" class="btn btn-info w-100" style="background-color: #fcae11; border-color: #fcae11; height: 80px" onclick={()=>calc()}>=</button></td>
            <td><button type="button" class="btn btn-info w-100" style="background-color: #fcae11; border-color: #fcae11; height: 80px" onclick={()=>tirar()}>⌫</button></td>
        </tr>
    </tbody>
</table>
</div>
