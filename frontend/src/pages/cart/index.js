import React, { Component } from 'react'

import image from '../../imgs/serralheiros.jpg'

import './styles.css'

export default class Cart extends Component {



    render(){
        return(
            <div className="cart-container"> 
                <main>
                    <h1>Carrinho</h1>
                    <table>
                        <thead>
                            <th>Produto</th>
                            <th>Preço unitário</th>
                            <th>Quantidade</th>
                            <th>Subtotal</th>
                            <th>Excluir</th>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="product-td">
                                    <div>
                                        <img src={image} style={{width:"50px", height:"50px"}}></img>
                                        <ul>
                                        <li>nome do banco</li> 
                                        <li>estoque: 10</li> 
                                        </ul>
                                    </div>
                                </td>
                                <td>R$ 150</td>
                                <td className="quant-td">
                                    <div>
                                        <button>-</button>
                                        <input value={1}></input>
                                        <button>+</button>
                                    </div>
                                </td>
                                <td>R$200</td>
                                <td className="tresh-td"></td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr>
                                <td  colspan="5">
                                    <div>
                                        <p>total: <b>R$445</b></p>
                                        <p>ou em até <b>3x</b> de <b>R$111</b> sem juros</p>
                                    </div>
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                    <section className="finalizarcompra-section">
                        <div className="finalizarcompra-div">
                            <strong>comprasegura</strong>
                            <div>
                                <button>ver outros produtos</button>
                                <button>Solicitar orçamento</button>
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        )
    }
}