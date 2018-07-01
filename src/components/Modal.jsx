import React from 'react'

const Modal = (props) => {

  const { idValue,click } = props

  return (
    <div id={idValue} className="modal fade">
					<div className="modal-dialog" role="document">
						<div className="modal-content">
							<div className="modal-header">
								<h5 className="modal-title">Excluir</h5>
								<button type="button" className="close" data-dismiss="modal" aria-label="Fechar">
									<span aria-hidden="true">&times;</span>
								</button>
							</div>
							<div className="modal-body">
								<p>Tem certeza que deseja exxluir este registro?</p>
							</div>
							<div className="modal-footer">
								<button type="button" className="btn btn-primary">Salvar</button>
								<button type="button" className="btn btn-danger" data-dismiss="modal">Cancelar</button>
							</div>

						</div>
					</div>
				</div>
  )
}

export default Modal
