import './styles.css';

function LegendControl() {
  function onAdd(map) {
    this._map = map;
    this._container = document.createElement('div');
    this._container.className =
      'maplibregl-ctrl maplibregl-ctrl-group maplibregl-ctrl-legend';
    this._container.innerHTML = `
      <table>
        <tr>
          <th>Color</th>
          <th>Magnitude</th>
        </tr>
        <tr>
          <td><span style="background-color: #147DF5;"></span></td>
          <td style="color: #147DF5;">2.5 or less</td>
        </tr>
        <tr>
          <td><span style="background-color: #FFEA00;"></span></td>
          <td style="color: #FFEA00;">2.5 to 5.4</td>
        </tr>
        <tr>
          <td><span style="background-color: #FF8700;"></span></td>
          <td style="color: #FF8700;">5.5 to 6.9</td>
        </tr>
        <tr>
          <td><span style="background-color: #FF0000;"></span></td>
          <td style="color: #FF0000;">7.0 or greater</td>
        </tr>
      </table>
    `;

    return this._container;
  }
  function onRemove() {
    this._container.parentNode.removeChild(this._container);
    this._map = undefined;
  }
  return {
    onAdd,
    onRemove,
  };
}

export default LegendControl;
