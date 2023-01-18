export default function PresentationForm () {
    return (
        <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Create a new presentation</h1>
            <form id="create-presentation-form">
              <div className="form-floating mb-3">
                <input placeholder="Presenter name" required type="text" name="presenter_name" id="presenter_name" className="form-control"/>
                <label htmlFor="presenter_name">Presenter name</label>
              </div>
              <div className="form-floating mb-3">
                <input placeholder="Presenter email" required type="email" name="presenter_email" id="presenter_email" className="form-control"/>
                <label htmlFor="presenter_email">Presenter email</label>
              </div>
              <div className="form-floating mb-3">
                <input placeholder="Company name" type="text" name="company_name" id="company_name" className="form-control"/>
                <label htmlFor="company_name">Company name</label>
              </div>
              <div className="form-floating mb-3">
                <input placeholder="Title" required type="text" name="title" id="title" className="form-control"/>
                <label htmlFor="title">Title</label>
              </div>
              <div>
                <div className="mb-3">
                    <label htmlFor="synopsis">Synopsis</label>
                    <textarea className="form-control" id="synopsis" rows="3" name="synopsis"></textarea>
                  </div>
              </div>
              <div className="mb-3">
                <select required id="conference" name="conference" className="form-select">
                  <option value="">Choose a conference</option>
                </select>
              </div>
              <button className="btn btn-primary">Create</button>
            </form>
          </div>
        </div>
      </div>
    )
};
