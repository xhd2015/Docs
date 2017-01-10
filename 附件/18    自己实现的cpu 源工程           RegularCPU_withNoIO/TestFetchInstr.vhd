--------------------------------------------------------------------------------
-- Company: 
-- Engineer:
--
-- Create Date:   10:56:27 07/27/2016
-- Design Name:   
-- Module Name:   H:/RegularCPU_withNoIO/TestFetchInstr.vhd
-- Project Name:  RegularCPU
-- Target Device:  
-- Tool versions:  
-- Description:   
-- 
-- VHDL Test Bench Created by ISE for module: FetchInstr
-- 
-- Dependencies:
-- 
-- Revision:
-- Revision 0.01 - File Created
-- Additional Comments:
--
-- Notes: 
-- This testbench has been automatically generated using types std_logic and
-- std_logic_vector for the ports of the unit under test.  Xilinx recommends
-- that these types always be used for the top-level I/O of a design in order
-- to guarantee that the testbench will bind correctly to the post-implementation 
-- simulation model.
--------------------------------------------------------------------------------
LIBRARY ieee;
USE ieee.std_logic_1164.ALL;
 
-- Uncomment the following library declaration if using
-- arithmetic functions with Signed or Unsigned values
--USE ieee.numeric_std.ALL;
 
ENTITY TestFetchInstr IS
END TestFetchInstr;
 
ARCHITECTURE behavior OF TestFetchInstr IS 
 
    -- Component Declaration for the Unit Under Test (UUT)
 
    COMPONENT FetchInstr
    PORT(
         cs : IN  std_logic;
         cs_alu : IN  std_logic;
         cs_writ : IN  std_logic;
         reset : IN  std_logic;
         pc_update : IN  std_logic;
         pc_rewrite : IN  std_logic_vector(15 downto 0);
         ir_in : IN  std_logic_vector(15 downto 0);
         pc_out : OUT  std_logic_vector(15 downto 0);
         ir_out : OUT  std_logic_vector(15 downto 0);
         if_irread : OUT  std_logic
        );
    END COMPONENT;
    

   --Inputs
   signal cs : std_logic := '0';
   signal cs_alu : std_logic := '0';
   signal cs_writ : std_logic := '0';
   signal reset : std_logic := '0';
   signal pc_update : std_logic := '0';
   signal pc_rewrite : std_logic_vector(15 downto 0) := (others => '0');
   signal ir_in : std_logic_vector(15 downto 0) := (others => '0');

 	--Outputs
   signal pc_out : std_logic_vector(15 downto 0);
   signal ir_out : std_logic_vector(15 downto 0);
   signal if_irread : std_logic;
   -- No clocks detected in port list. Replace <clock> below with 
   -- appropriate port name 
 
   constant clock_period : time := 10 ns;
 
BEGIN
 
	-- Instantiate the Unit Under Test (UUT)
   uut: FetchInstr PORT MAP (
          cs => cs,
          cs_alu => cs_alu,
          cs_writ => cs_writ,
          reset => reset,
          pc_update => pc_update,
          pc_rewrite => pc_rewrite,
          ir_in => ir_in,
          pc_out => pc_out,
          ir_out => ir_out,
          if_irread => if_irread
        );



   -- Stimulus process
   stim_proc: process
   begin		
      -- hold reset state for 100 ns.
      wait for 100 ns;	
		
		cs<='0';
		reset<='1';
      wait for clock_period*10;
		cs<='1';
		reset<='0';
		wait for 1 ns;
		ir_in<="0001000110001000";
      -- insert stimulus here 
		wait for clock_period*10;
		cs<='0';
		pc_update<='1';
		pc_rewrite<="0011001111001100";
		wait for clock_period*10;
		pc_rewrite<="0001100011111111";
		wait for clock_period*10;
		pc_update<='0';
		cs_alu<='1';
		
      wait;
   end process;

END;
