
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

class CandleCalculator extends StatefulWidget {
  const CandleCalculator({super.key});

  @override
  State<CandleCalculator> createState() => _CandleCalculatorState();
}

class _CandleCalculatorState extends State<CandleCalculator> {
  final _formKey = GlobalKey<FormState>();
  
  // Controllers
  final _containerWeightController = TextEditingController();
  final _containerDiameterController = TextEditingController();
  final _containerHeightController = TextEditingController();
  final _waxPourHeightController = TextEditingController();
  
  // Results
  double _waxWeight = 0.0;
  double _fragrance = 0.0;
  double _dye = 0.0;
  bool _calculated = false;

  void _calculateRecipe() {
    if (!_formKey.currentState!.validate()) {
      return;
    }

    // Convert input to double
    final containerWeight = double.parse(_containerWeightController.text);
    final containerDiameter = double.parse(_containerDiameterController.text);
    final containerHeight = double.parse(_containerHeightController.text);
    final waxPourHeight = double.parse(_waxPourHeightController.text);
    
    // Calculate container volume (π * r² * h)
    final radius = containerDiameter / 2;
    final volume = 3.14159 * radius * radius * waxPourHeight;
    
    // Calculate wax weight (volume * density of wax - 0.9g/cm³)
    final waxWeight = volume * 0.9;
    
    // Calculate fragrance (10% of wax weight)
    final fragrance = waxWeight * 0.1;
    
    // Calculate dye (0.2% of wax weight)
    final dye = waxWeight * 0.002;
    
    setState(() {
      _waxWeight = waxWeight;
      _fragrance = fragrance;
      _dye = dye;
      _calculated = true;
    });
  }

  void _resetForm() {
    setState(() {
      _containerWeightController.clear();
      _containerDiameterController.clear();
      _containerHeightController.clear();
      _waxPourHeightController.clear();
      _waxWeight = 0.0;
      _fragrance = 0.0;
      _dye = 0.0;
      _calculated = false;
    });
    
    // Show reset confirmation
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(
        content: Text('Reset completato'),
        duration: Duration(seconds: 2),
      ),
    );
  }

  @override
  void dispose() {
    _containerWeightController.dispose();
    _containerDiameterController.dispose();
    _containerHeightController.dispose();
    _waxPourHeightController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(16),
        boxShadow: [
          BoxShadow(
            color: const Color(0xFFFFA726).withOpacity(0.1),
            spreadRadius: 1,
            blurRadius: 10,
            offset: const Offset(0, 2),
          ),
        ],
        border: Border.all(
          color: const Color(0xFFFFA726).withOpacity(0.2),
          width: 1,
        ),
      ),
      padding: const EdgeInsets.all(24),
      child: Form(
        key: _formKey,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'Calcolatore di Ricette',
              style: Theme.of(context).textTheme.titleLarge,
              textAlign: TextAlign.center,
            ),
            const SizedBox(height: 24),
            
            // Input fields
            _buildInputField(
              label: 'Peso del contenitore (g)',
              controller: _containerWeightController,
              hint: 'es. 150',
              context: context,
            ),
            const SizedBox(height: 16),
            
            _buildInputField(
              label: 'Diametro del contenitore (cm)',
              controller: _containerDiameterController,
              hint: 'es. 8',
              context: context,
            ),
            const SizedBox(height: 16),
            
            _buildInputField(
              label: 'Altezza del contenitore (cm)',
              controller: _containerHeightController,
              hint: 'es. 10',
              context: context,
            ),
            const SizedBox(height: 16),
            
            _buildInputField(
              label: 'Altezza del riempimento con cera (cm)',
              controller: _waxPourHeightController,
              hint: 'es. 9',
              context: context,
            ),
            const SizedBox(height: 32),
            
            // Buttons
            Row(
              children: [
                Expanded(
                  child: ElevatedButton(
                    onPressed: _calculateRecipe,
                    style: ElevatedButton.styleFrom(
                      backgroundColor: const Color(0xFFFFA726),
                      padding: const EdgeInsets.symmetric(vertical: 16),
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(8),
                      ),
                    ),
                    child: const Text(
                      'Calcola',
                      style: TextStyle(fontSize: 16, color: Colors.white),
                    ),
                  ),
                ),
                const SizedBox(width: 16),
                ElevatedButton(
                  onPressed: _resetForm,
                  style: ElevatedButton.styleFrom(
                    backgroundColor: Colors.white,
                    padding: const EdgeInsets.symmetric(vertical: 16),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(8),
                      side: const BorderSide(color: Color(0xFFFFA726)),
                    ),
                  ),
                  child: const Icon(Icons.refresh, color: Color(0xFFFFA726)),
                ),
              ],
            ),
            
            // Results section
            if (_calculated) ...[
              const SizedBox(height: 32),
              const Divider(),
              const SizedBox(height: 24),
              Text(
                'Risultati della ricetta',
                style: Theme.of(context).textTheme.titleLarge,
                textAlign: TextAlign.center,
              ),
              const SizedBox(height: 16),
              _buildResultItem(
                label: 'Peso della cera',
                value: '${_waxWeight.toStringAsFixed(1)} g',
                context: context,
              ),
              const SizedBox(height: 12),
              _buildResultItem(
                label: 'Fragranza (10%)',
                value: '${_fragrance.toStringAsFixed(1)} g',
                context: context,
              ),
              const SizedBox(height: 12),
              _buildResultItem(
                label: 'Colorante (0.2%)',
                value: '${_dye.toStringAsFixed(1)} g',
                context: context,
              ),
            ],
          ],
        ),
      ),
    );
  }

  Widget _buildInputField({
    required String label,
    required TextEditingController controller,
    required String hint,
    required BuildContext context,
  }) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          label,
          style: const TextStyle(
            fontWeight: FontWeight.w500,
            fontSize: 14,
          ),
        ),
        const SizedBox(height: 8),
        TextFormField(
          controller: controller,
          keyboardType: const TextInputType.numberWithOptions(decimal: true),
          inputFormatters: [
            FilteringTextInputFormatter.allow(RegExp(r'^\d*\.?\d*$')),
          ],
          decoration: InputDecoration(
            hintText: hint,
            border: OutlineInputBorder(
              borderRadius: BorderRadius.circular(8),
              borderSide: const BorderSide(color: Colors.black12),
            ),
            focusedBorder: OutlineInputBorder(
              borderRadius: BorderRadius.circular(8),
              borderSide: BorderSide(color: Theme.of(context).primaryColor),
            ),
            contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
          ),
          validator: (value) {
            if (value == null || value.isEmpty) {
              return 'Questo campo è obbligatorio';
            }
            if (double.tryParse(value) == null) {
              return 'Inserisci un numero valido';
            }
            return null;
          },
        ),
      ],
    );
  }

  Widget _buildResultItem({
    required String label,
    required String value,
    required BuildContext context,
  }) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        Text(
          label,
          style: const TextStyle(
            fontSize: 16,
          ),
        ),
        Text(
          value,
          style: TextStyle(
            fontSize: 16,
            fontWeight: FontWeight.bold,
            color: Theme.of(context).primaryColor,
          ),
        ),
      ],
    );
  }
}
