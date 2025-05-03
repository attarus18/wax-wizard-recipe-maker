
import 'package:flutter/material.dart';
import '../widgets/header.dart';
import '../widgets/candle_calculator.dart';
import '../widgets/footer.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      body: SafeArea(
        child: SingleChildScrollView(
          child: Container(
            padding: const EdgeInsets.all(16.0),
            child: Column(
              children: [
                const Header(),
                const SizedBox(height: 24),
                const CandleCalculator(),
                const SizedBox(height: 24),
                const Footer(),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
