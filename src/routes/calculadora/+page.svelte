<script>
    let display = $state('');

    function press(c){
        display += c.toString();
    }

    function tirar(){
        display = display.slice(0, -1);
    }

    function calc(){
        try {
            display = eval(display
                .replaceAll('x', '*')
                .replaceAll('√', 'Math.sqrt')
                .replaceAll('^', '**')
            ).toString();
        } catch (error) {
            display = 'Error';
        }
    }

    function clear(){
        display = '';
    }

    function inverterSinal(){
        try {
            if (display === '' || display === 'Error') return;
            const currentValue = parseFloat(display);
            if (!isNaN(currentValue)) {
                display = (-currentValue).toString();
            } else {
                const evaluatedValue = eval(display.replaceAll('x', '*'));
                display = (-evaluatedValue).toString();
            }
        } catch (error) {
            display = 'Error';
        }
    }

    function aoQuadrado(){
        try {
            display = eval(`(${display})**2`).toString();
        } catch (error) {
            display = 'Error';
        }
    }

    function roundNumber() {
        try {
            display = Math.round(eval(display)).toString();
        } catch (error) {
            display = 'Error';
        }
    }

    function logBase10() {
        try {
            display = Math.log10(eval(display)).toString();
        } catch (error) {
            display = 'Error';
        }
    }

    function modulo() {
        press('%');
    }
</script>

<div class="text-center mt-3">
    <input type="text" class="form-control form-control-lg" readonly bind:value={display}>
    <table class="table table-sm table-borderless">
        <tbody>
            <tr>
                <td><button class="btn btn-danger w-100" style="background-color: #ca1444; border-color: #ca1444; height: 80px" onclick={() => clear()}>C</button></td>
                <td><button class="btn btn-primary w-100" style="background-color: #28424f; border-color: #28424f; height: 80px" onclick={() => press('(')}>&lpar;</button></td>
                <td><button class="btn btn-primary w-100" style="background-color: #28424f; border-color: #28424f; height: 80px" onclick={() => press(')')}>&rpar;</button></td>
                <td><button class="btn btn-info w-100" style="background-color: #fcae11; border-color: #fcae11; height: 80px" onclick={() => press('/')}>/</button></td>
            </tr>
            <tr>
                <td><button class="btn btn-primary w-100" style="background-color: #000000; border-color: #000000; height: 80px" onclick={() => press('7')}>7</button></td>
                <td><button class="btn btn-primary w-100" style="background-color: #000000; border-color: #000000; height: 80px" onclick={() => press('8')}>8</button></td>
                <td><button class="btn btn-primary w-100" style="background-color: #000000; border-color: #000000; height: 80px" onclick={() => press('9')}>9</button></td>
                <td><button class="btn btn-info w-100" style="background-color: #fcae11; border-color: #fcae11; height: 80px" onclick={() => press('x')}>X</button></td>
            </tr>
            <tr>
                <td><button class="btn btn-primary w-100" style="background-color: #000000; border-color: #000000; height: 80px" onclick={() => press('4')}>4</button></td>
                <td><button class="btn btn-primary w-100" style="background-color: #000000; border-color: #000000; height: 80px" onclick={() => press('5')}>5</button></td>
                <td><button class="btn btn-primary w-100" style="background-color: #000000; border-color: #000000; height: 80px" onclick={() => press('6')}>6</button></td>
                <td><button class="btn btn-info w-100" style="background-color: #fcae11; border-color: #fcae11; height: 80px" onclick={() => press('-')}>-</button></td>
            </tr>
            <tr>
                <td><button class="btn btn-primary w-100" style="background-color: #000000; border-color: #000000; height: 80px" onclick={() => press('1')}>1</button></td>
                <td><button class="btn btn-primary w-100" style="background-color: #000000; border-color: #000000; height: 80px" onclick={() => press('2')}>2</button></td>
                <td><button class="btn btn-primary w-100" style="background-color: #000000; border-color: #000000; height: 80px" onclick={() => press('3')}>3</button></td>
                <td><button class="btn btn-info w-100" style="background-color: #fcae11; border-color: #fcae11; height: 80px" onclick={() => press('+')}>+</button></td>
                
            </tr>
            <tr>
                <td><button class="btn btn-primary w-100" style="background-color: #000000; border-color: #000000; height: 80px" onclick={() => press('0')}>0</button></td>
                <td><button class="btn btn-info w-100" style="background-color: #28424f; border-color: #28424f; height: 80px; color: white" onclick={() => press('.')}>.</button></td>
                <td><button class="btn btn-info w-100" style="background-color: #0884c2; border-color: #0884c2; height: 80px" onclick={() => calc()}>=</button></td>
                <td><button class="btn btn-info w-100" style="background-color: #fcae11; border-color: #fcae11; height: 80px" onclick={() => tirar()}>⌫</button></td>
                
            </tr>
            <tr>
                <td><button class="btn btn-info w-100" style="background-color: #fcae11; border-color: #fcae11; height: 80px" onclick={() => roundNumber()}>Round</button></td>
                <td><button class="btn btn-info w-100" style="background-color: #fcae11; border-color: #fcae11; height: 80px" onclick={() => logBase10()}>log₁₀</button></td>
                <td><button class="btn btn-info w-100" style="background-color: #fcae11; border-color: #fcae11; height: 80px" onclick={() => modulo()}>%</button></td>
                
            </tr>
            <tr>
                <td><button class="btn btn-info w-100" style="background-color: #fcae11; border-color: #fcae11; height: 80px" onclick={() => press('√(')}>√</button></td>
                <td><button class="btn btn-info w-100" style="background-color: #fcae11; border-color: #fcae11; height: 80px" onclick={() => aoQuadrado()}>x²</button></td>
                <td><button class="btn btn-info w-100" style="background-color: #fcae11; border-color: #fcae11; height: 80px" onclick={() => inverterSinal()}>+/-</button></td>
            </tr>
            <tr>

            </tr>
        </tbody>
    </table>
</div>