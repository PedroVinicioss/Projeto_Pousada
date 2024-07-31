import Picture from '../assets/capa.jpg';

export function Auth(){
    return (
        <>
            <div className="main-Login">
                <div className="main-picture">
                    <img src={Picture} alt="" />
                </div>
                <div className="main-form">
                <form>
                    <label htmlFor="">E-mail</label>
                    <input type="e-mail" />
                    <br />
                    <label htmlFor="">Password</label>
                    <input type="password" />
                </form>
                </div>
            </div>
        </>
    );
}